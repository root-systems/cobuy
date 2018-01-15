import { map, prop, groupBy, sum, mapObjIndexed, values, pipe, uniq, pick, sortBy, reverse, find, filter, contains, isNil, concat, indexOf, remove, reduce, where, equals, omit, merge, not } from 'ramda'
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
  before: {
  },
  after: {
    create: [
      iff(taskRecipeIsCompleteOrderSetup, createCastOrderIntentTaskPlan),
      iff(taskRecipeIsCompleteOrderSetup, createCommitOrderTaskPlan),
      iff(taskRecipeIsStartOrder, sendStartOrderEmails),
        // iff(userHasNotSetPassword,
        //   sendWelcomeEmail,
        //   sendOrderEmail)
        // ),
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

function taskRecipeIsStartOrder (hook) {
  return hook.data.taskRecipeId === 'startOrder'
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

function sendStartOrderEmails (hook) {
  console.log('sendStartOrderEmails', hook.data)
  const taskPlans = hook.app.service('taskPlans')
  const orders = hook.app.service('orders')
  const relationships = hook.app.service('relationships')
  // const agents = hook.app.service('agents')
  const credentials = hook.app.service('credentials')
  const tokens = hook.app.service('tokens')

  const hasPassword = (credential) => {
    console.log('checking if credential has password', credential)
    return not(isNil(credential.password))
  }

  const sendEmailBasedOnPasswordStatus = (credential) => {
    if (hasPassword(credential)) {
      console.log('has password, sending start order email')
    } else {
      console.log(`doesn't have password, sending password email`)
    }
  }


  return taskPlans.get(hook.data.taskPlanId)
  .then((taskPlanResult) => {
    console.log('found taskPlan', taskPlanResult)
    return orders.get(taskPlanResult.params.orderId)
    .then((orderResult) => {
      console.log('related order', orderResult)
      return relationships.find({
        query: {
          sourceId: orderResult.consumerAgentId,
          relationshipType: 'member'
        }
      })
      .then((relationshipResults) => {
        console.log('member relationshipResults', relationshipResults)
        const agentIds = map((r) => r.targetId, relationshipResults)
        console.log('agentIds', agentIds)
        return credentials.find({
          query: {
            agentId: {
              $in: agentIds
            }
          }
        })
        .then((credentialResults) => {
          console.log('member credentialResults', credentialResults)
          return Promise.all(map(sendEmailBasedOnPasswordStatus, credentialResults))
          .then(() => {
            return hook
          })
        })
      })
    })
  })
}


function createPatchCredentialsTokenAndInviteMail (hook) {
  // userHasNotSetPassword { taskPlanId: 80,
  // taskRecipeId: 'startOrder',
  // workerAgentId: 1,
  // params: {} }
  const appConfig = hook.app.get('app')
  const { id, agentId, email } = hook.result

  // 1. find order with adminAgentId: workerAgentId,
  // taskPlanId: taskPlanId

  // 2. get buying group from order, consumerGroupId

  // 3. find all members (Agents) for this buying group, through relationships,
  // where sourceId: consumerGroupId,
  // relationshipType: 'member',
  // get all targetIds

  // 6. get all Credentials for these Agents

  // 5. check each Credential with this function

  // TODO: IK: get the agent name, admin name, group name
  return hook.app.service('tokens').create({
    agentId,
    service: 'credentials',
    method: 'patch',
    params: { serviceId: id }
  })
  // TODO: add .env variables to change from 'Tapin' in copy
  .then((token) => {
    return hook.app.service('mailer').create({
      from: `${appConfig.email}`,
      to: email || 'no@email.com',
      subject: `You're invited to join ${appConfig.name}!`,
      html: `
        Hi. You're invited to join a group on ${appConfig.name}!

        <br />
        <br />

        ${appConfig.bodyText}

        <br />
        <br />

        Click <a href=${hook.app.get('app').url}/invited/${token.jwt}>here</a> to set your password and start buying together!
      `
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

function createCommitOrderTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const orders = hook.app.service('orders')
  const taskRecipeId = taskRecipes.commitOrder.id
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
