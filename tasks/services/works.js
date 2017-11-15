import { map, prop, groupBy, sum, mapObjIndexed, values, pipe, uniq, pick, sortBy, reverse, find, filter, contains, isNil, concat, indexOf, remove, reduce, where, equals, omit, merge } from 'ramda'
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
      // this is logic which can be expressed as: given a set of orderIntents (and related priceSpecs), what is the applicable priceSpecId per product of the orderIntents?

      const groupByProductId = groupBy(prop('productId'))
      const groupByAgentId = groupBy(prop('agentId'))
      const groupByPriceSpecId = groupBy(prop('priceSpecId'))
      const mapToQuantities = map(prop('desiredQuantity'))

      const getUniqPriceSpecIds = pipe(map(prop('priceSpecId')), uniq)
      return priceSpecs.find({
        query: {
          id: {
            $in: getUniqPriceSpecIds(queriedOrderIntents)
          }
        }
      })
      .then((queriedPriceSpecs) => {
        // group priceSpecs by productId for easier searching later
        const priceSpecsByProductId = pipe(
          groupByProductId,
          map(pipe(
            sortBy(prop('minimum')),
            reverse
          ))
        )(queriedPriceSpecs)

        // this is kinda confusing, but we need to have access to the 'correct' priceSpec per product (as determined by the collective quantity of the orderIntents), but ALSO any other priceSpecs for that product where the minimum is less than the correct priceSpec
        // this is because a user may have indicated they want X units of a product at a 'lower' priceSpec, but left the 'correct' priceSpec unspecified
        // in which case we want them to have an orderPlan for the quantity the specified for the lower priceSpec, but at the cheaper price of the correct priceSpec
        // the orderPlans will still be created with the 'correct' priceSpec, but we need to know later if a given priceSpecId in an orderIntent has a lower or higher minimum than the 'correct' one, and thus whether an orderPlan should be created
        const getApplicablePriceSpecsPerProduct = pipe(
          groupByProductId,
          map(pipe(
            groupByPriceSpecId,
            map(pipe(
              // for each product and priceSpec, sum the quantities
              mapToQuantities,
              sum
            ))
          )),
          // get all applicable priceSpecs ('correct' and 'lower' priceSpecs)
          // TODO: IK: this could probably be made more ramda-y
          mapObjIndexed((quantities, productId) => {
            return filter((priceSpec) => {
              return priceSpec.minimum <= quantities[priceSpec.id]
            }, priceSpecsByProductId[productId])
          })
        )

        return getApplicablePriceSpecsPerProduct(queriedOrderIntents)
      })
      .then((applicablePriceSpecsPerProductId) => {
        // now to create a single orderPlan per unique combination of orderIntent agent and product, with the correct priceSpec for that product
        // but ONLY if the priceSpecId for the orderIntent is one of the applicablePriceSpecsPerProductId
        // if priceSpec doesn't exist in applicablePriceSpecsPerProductId, then minimum for that priceSpec was not reached - thus no orderPlan created
        // TODO: IK: most of this could be more ramda-y

        const orderIntentsWithApplicablePriceSpec = filter((orderIntent) => {
          const priceSpecIdsForProduct = values(map(prop('id'), applicablePriceSpecsPerProductId[orderIntent.productId]))
          return contains(orderIntent.priceSpecId, priceSpecIdsForProduct)
        }, queriedOrderIntents)

        const singleOrderIntentPerProductPerAgent = reduce((reducedOrderIntents, orderIntent) => {
          // check if reducedOrderIntents already has an orderIntent with the agentId, productId
          // if so, if the iterating orderIntent has a priceSpec which has a higher minimum than the existing orderIntent, then replace
          // TODO: IK: better to not be finding each time, instead have orderIntents organised by agentId by productId and then flatten at end
          const matchingOrderIntent = find(where({ agentId: equals(orderIntent.agentId), productId: equals(orderIntent.productId) }), reducedOrderIntents)
          if (isNil(matchingOrderIntent)) return concat(reducedOrderIntents, [orderIntent])

          const applicablePriceSpecIds = map(prop('priceSpecId'), applicablePriceSpecsPerProductId[orderIntent.productId])
          const iteratingOrderIntentPriceSpecIndex = indexOf(orderIntent.priceSpecId, applicablePriceSpecIds)
          const currentOrderIntentPriceSpecIndex = indexOf(matchingOrderIntent.priceSpecId, applicablePriceSpecIds)

          if (iteratingOrderIntentPriceSpecIndex < currentOrderIntentPriceSpecIndex) {
            // we want to replace matchingOrderIntent with orderIntent
            return concat(orderIntent, remove(indexOf(matchingOrderIntent, reducedOrderIntents), 1))
          } else {
            return reducedOrderIntents
          }
        }, [], orderIntentsWithApplicablePriceSpec)

        // finally, create the orderPlans
        return Promise.all(
          map((orderIntent) => {
            return orderPlans.create(
              omit(['desiredQuantity'], merge(orderIntent, { quantity: orderIntent.desiredQuantity }))
            )
          }, singleOrderIntentPerProductPerAgent)
        )
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
