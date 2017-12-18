import { map, prop, groupBy, sum, mapObjIndexed, values, pipe, uniq, pick, sortBy, reverse, find, filter, contains, isNil, concat, indexOf, remove, reduce, where, equals, omit, merge } from 'ramda'
import * as taskRecipes from '../../tasks/data/recipes'

import getCurrentOrderApplicableOrderIntentsFlattened from '../../ordering/getters/getCurrentOrderApplicableOrderIntentsFlattened'

const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'taskWorks'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {},
  after: {
    create: [
      iff(taskRecipeIsCompleteOrderSetup, createCastOrderIntentTaskPlan),
      iff(taskRecipeIsCompleteOrderSetup, createCloseOrderTaskPlan),
      iff(taskRecipeIsCloseOrder, createCastOrderIntentTaskWorks),
      iff(taskRecipeIsCloseOrder, createOrderPlans),
      iff(taskRecipeIsCloseOrder, createViewOrderSummaryTaskPlan)
    ]
  },
  error: {}
}

function taskRecipeIsCompleteOrderSetup (hook) {
  return hook.data.taskRecipeId === 'completeOrderSetupWithPrereqs'
    || hook.data.taskRecipeId === 'completeOrderSetup'
}

function taskRecipeIsCloseOrder (hook) {
  return hook.data.taskRecipeId === 'closeOrder'
}

function createOrderPlans (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const orders = hook.app.service('orders')
  const orderIntents = hook.app.service('orderIntents')
  const priceSpecs = hook.app.service('priceSpecs')
  const orderPlans = hook.app.service('orderPlans')

  const getUniqProductIds = pipe(map(prop('productId')), uniq)

  return taskPlans.get(hook.data.taskPlanId)
    .then((taskPlan) => {
      return orders.get(taskPlan.params.orderId)
      .then((order) => {
        return orderIntents.find({
          query: {
            orderId: order.id
          }
        })
      })
      .then((queriedOrderIntents) => {
        return priceSpecs.find({
          query: {
            productId: {
              $in: getUniqProductIds(queriedOrderIntents)
            }
          }
        })
        .then((queriedPriceSpecs) => {
          // need 'state' and 'props' objects for the getters
          const state = {
            orderIntents: queriedOrderIntents,
            priceSpecs: queriedPriceSpecs
          }
          const props = { taskPlan }

          const flattenedOrderIntents = getCurrentOrderApplicableOrderIntentsFlattened(state, props)
          return Promise.all(
            flattenedOrderIntents.map((orderIntent) => {
              return orderPlans.create(
                omit(['id', 'desiredQuantity'], merge(orderIntent, { quantity: orderIntent.desiredQuantity }))
              )
            })
          )
        })
      })
    })
    .then(() => hook)
}

function createCastOrderIntentTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const orders = hook.app.service('orders')
  const relationships = hook.app.service('relationships')
  const taskRecipeId = taskRecipes.castIntent.id
  const completeOrderTaskPlanId = hook.data.taskPlanId

  return taskPlans.get(completeOrderTaskPlanId)
  .then((completeOrderTaskPlan) => {
    const orderId = completeOrderTaskPlan.params.orderId
    return orders.get(orderId)
  })
  .then((order) => {
    const { id, consumerAgentId, supplierAgentId, adminAgentId } = order
    const params = { orderId: id, consumerAgentId, supplierAgentId, adminAgentId }
    return Promise.all([
      Promise.resolve(params),
      relationships.find({
        query: {
          sourceId: consumerAgentId,
          relationshipType: 'member'
        }
      })
    ])
  })
  .then(([params, relationships]) => {
    return Promise.all(
      map((relationship) => {
        const assigneeId = prop('targetId', relationship)
        return taskPlans.create({ taskRecipeId, params, assigneeId })
      }, relationships)
    )
  })
  .then(() => hook)
}

function createCloseOrderTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const orders = hook.app.service('orders')
  const taskRecipeId = taskRecipes.closeOrder.id
  const completedTaskPlanId = hook.result.taskPlanId

  return taskPlans.get(completedTaskPlanId)
    .then((completedTaskPlan) => {
      const { orderId } = completedTaskPlan.params
      return orders.get(orderId)
    })
    .then((order) => {
      const { id, adminAgentId } = order
      const params = {
        orderId: id,
      }
      return taskPlans.create({ taskRecipeId, params, assigneeId: adminAgentId })
    })
    .then(() => {
      return hook
    })
}

function createCastOrderIntentTaskWorks (hook) {
  // order has closed, get all relevant taskPlans, create a taskWork for em
  const taskPlans = hook.app.service('taskPlans')
  const taskWorks = hook.app.service('taskWorks')
  const closeOrderTaskPlanId = hook.data.taskPlanId

  return taskPlans.get(closeOrderTaskPlanId)
    .then((closeOrderTaskPlan) => {
      const orderId = closeOrderTaskPlan.params.orderId
      // const params = { orderId, consumerAgentId: groupId, supplierAgentId }

      // TODO: IK: feels like a pretty sub-optimal way of querying, probably makes sense to have orderId as it's own column
      return taskPlans.find({
        query: {
          taskRecipeId: 'castIntent'
          // TODO: IK: can't compare JSON values in postgres, need another way to do it
          // params: {
          //   $like: `%"orderId":${orderId}%`
          // }
        }
      })
        .then((taskPlans) => {
          // TODO: IK: can't compare JSON values in postgres, need another way to do it
          const currentOrderTaskPlans = filter((plan) => { return plan.params.orderId === orderId }, taskPlans)
          return Promise.all(currentOrderTaskPlans.map((taskPlan) => {
            const { id, taskRecipeId, assigneeId, params } = taskPlan
            return taskWorks.create({
              taskPlanId: id,
              taskRecipeId,
              workerAgentId: assigneeId,
              params
            })
          }))
        })
    })
    .then(() => hook)
}

function createViewOrderSummaryTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const orders = hook.app.service('orders')
  const taskRecipeId = taskRecipes.viewOrderSummary.id
  const closeOrderTaskPlanId = hook.data.taskPlanId

  return taskPlans.get(closeOrderTaskPlanId)
    .then((closeOrderTaskPlan) => {
      const orderId = closeOrderTaskPlan.params.orderId
      return orders.get(orderId)
    })
    .then((order) => {
      const { id, adminAgentId } = order
      const params = { orderId: id }
      return taskPlans.create({ taskRecipeId, params, assigneeId: adminAgentId })
    })
    .then(() => {
      return hook
    })
}
