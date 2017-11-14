import { map, prop, groupBy, sum, mapObjIndexed, values, tap, pipe, uniq, pick, sortBy, reverse } from 'ramda'
import * as taskRecipes from '../../tasks/data/recipes'
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
  const orders = hook.app.service('orders')
  const taskPlans = hook.app.service('taskPlans')
  const orderIntents = hook.app.service('orderIntents')
  const orderPlans = hook.app.service('orderPlans')
  const priceSpecs = hook.app.service('priceSpecs')
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
    .then((queriedOrderIntents) => {
      // TODO: IK: similar logic will also be needed on the client for showing the current state of the order per product - i.e. which priceSpec is currently going to be enforced
      // this is logic which can be expressed as: given a set of orderIntents (and related priceSpecs), what is the desiredQuantity and applicable priceSpecId per product of the orderIntents?
      // actually, thinking about this again, probably easier to just get / query for all the possible priceSpecs... will query for more records but saves a whole logic step, plus means back and front logic is more similar, perhaps even the same

      const getUniqPriceSpecIds = pipe(map(prop('priceSpecId')), uniq)
      return priceSpecs.find({
        query: {
          id: {
            $in: getUniqPriceSpecIds(queriedOrderIntents)
          }
        }
      })
      .then((queriedPriceSpecs) => {
        // for each productId of the orderIntents, sum the 'quantity' field of all orderIntents with the same productId
        const groupByProductId = groupBy(prop('productId'))
        // we need to sum the quantities at each priceSpec
        const groupByPriceSpecId = groupBy(prop('priceSpecId'))
        const mapToQuantities = map(prop('desiredQuantity'))
        // const priceSpecQuantitiesByProductId = map(, orderIntentsByProductId)
        // const quantitiesOrderedByProductId = map((intent) => sum(map(prop('desiredQuantity'), intent)), orderIntentsByProductId)
        // find the priceSpec for each productId where the summed quantity is equal to or greater than the 'minimum' (but only the priceSpec with the largest minimum)
        // need to test how combos of query params work in conjunction

        const priceSpecsByProductId = pipe(
          groupByProductId,
          map(pipe(
            sortBy(prop('minimum')),
            reverse
          ))
        )(queriedPriceSpecs)

        const getCollectiveQuantityAndPriceSpec = pipe(
          groupByProductId,
          map(pipe(
            groupByPriceSpecId,
            map(pipe(
              mapToQuantities,
              sum
            )),
          )),
          // map()
          tap(console.log)
        )
        return getCollectiveQuantityAndPriceSpec(queriedOrderIntents)
      })

      // console.log('all orderd by productId is: ', quantitiesOrderedByProductId)
      // return Promise.all(values(
      //   mapObjIndexed((quantity, productId) => {
      //     return priceSpecs.find({
      //       query: {
      //         productId,
      //         $limit: 1,
      //         $sort: {
      //           minimum: -1
      //         },
      //         minimum: {
      //           $lte: quantity
      //         }
      //       }
      //     })
      //   }, quantitiesOrderedByProductId)
      // ))
      // .then((queriedPriceSpecs) => {
      //   console.log('price specs: ', queriedPriceSpecs)
      //   // might need to flatten() queriedPriceSpecs
      //   // might want to groupBy on queriedPriceSpecs to group them by productId (might be better to use keyBy if it exists?)
      //   // for each unique combination of an orderIntent's agentId and productId, create a single orderPlan with the found priceSpecId
      //   // if no found priceSpecId, this means the combined orderIntents didn't meet a minimum quantity, therefore no orderPlan for that product
      //   // const matchedOrderIntents = filter()
      // })

      // return Promise.all(
      //   map((orderIntent) => {
      //     return orderPlans.create({
      //       orderId: orderIntent.orderId,
      //       agentId: orderIntent.agentId,
      //       quantity: orderIntent.desiredQuantity,
      //       productId: orderIntent.productId,
      //       priceSpecId: orderIntent.priceSpecId
      //     })
      //   }, orderIntents)
      // )
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

function createViewOrderSummaryTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.viewOrderSummary.id
  // TODO: IK: at the moment the assigneeId is automatically the user who closes the order, should be the order admin
  const assigneeId = hook.params.agent.id
  const closeOrderTaskPlanId = hook.data.taskPlanId

  return taskPlans.get(closeOrderTaskPlanId)
    .then((closeOrderTaskPlan) => {
      const orderId = closeOrderTaskPlan.params.orderId
      const params = { orderId }
      return taskPlans.create({ taskRecipeId, params, assigneeId })
    })
    .then(() => {
      return hook
    })
}
