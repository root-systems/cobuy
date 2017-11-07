const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { map, prop } from 'ramda'
import * as taskRecipes from '../../tasks/data/recipes'

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
      iff(taskRecipeIsCloseOrder, createOrderPlans)
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
  // TODO: IK: this is half done, aiming towards creating an orderPlan for each user who created an orderIntent for an order when that order closes
  // would also be triggered by taskRecipeIsCloseOrder
  const orders = hook.app.service('orders')
  const taskPlans = hook.app.service('taskPlans')
  const orderIntents = hook.app.service('orderIntents')
  const orderPlans = hook.app.service('orderPlans')
  return taskPlans.get(hook.data.taskPlanId)
    .then((taskPlan) => {
      return orders.get(taskPlan.params.orderId)
    })
    .then((order) => {
      return orderIntents.find({
        query: {
          orderId: order.id
        }
      })
    })
    .then((associatedOrderIntents) => {
      // for each order intent create an order plan
      return Promise.all(
        map((orderIntent) => {
          return orderPlans.create({
            orderId: orderIntent.orderId,
            agentId: orderIntent.agentId,
            quantity: orderIntent.desiredQuantity,
            productId: orderIntent.productId,
            priceSpecId: orderIntent.priceSpecId
          })
        }, associatedOrderIntents)
      )
    })
    .then(() => hook)
}

function createCastOrderIntentTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const relationships = hook.app.service('relationships')
  const taskRecipeId = taskRecipes.castIntent.id
  const completeOrderTaskPlanId = hook.data.taskPlanId

  return taskPlans.get(completeOrderTaskPlanId)
    .then((completeOrderTaskPlan) => {
      const groupId = completeOrderTaskPlan.params.consumerAgentId
      const orderId = completeOrderTaskPlan.params.orderId
      const supplierAgentId = completeOrderTaskPlan.params.supplierAgentId
      const params = { orderId, consumerAgentId: groupId, supplierAgentId }

      return relationships.find({
        query: {
          sourceId: groupId,
          relationshipType: 'member'
        }
      })
        .then((relationships) => {
          return Promise.all(
            map((relationship) => {
              const assigneeId = prop('targetId', relationship)
              return taskPlans.create({ taskRecipeId, params, assigneeId })
            }, relationships)
          )
        })
    })
    .then(() => hook)
}

function createCloseOrderTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.closeOrder.id
  // TODO: IK: at the moment the assigneeId is automatically the user who completesOrderSetup, should be the order admin
  const assigneeId = hook.params.agent.id
  const completedTaskPlanId = hook.result.taskPlanId

  return taskPlans.get(completedTaskPlanId)
    .then((completedTaskPlan) => {
      const { orderId } = completedTaskPlan.params
      const params = {
        // consumerAgentId: hook.data.consumerAgentId,
        // supplierAgentId: hook.data.supplierAgentId,
        orderId
      }
      return taskPlans.create({ taskRecipeId, params, assigneeId })
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
          taskRecipeId: 'castIntent',
          params: {
            $like: `%"orderId":${orderId}%`
          }
        }
      })
        .then((taskPlans) => {
          return Promise.all(taskPlans.map((taskPlan) => {
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
