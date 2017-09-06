const { iff } = require('feathers-hooks-common')
import { isNil, isEmpty, pipe, length, equals } from 'ramda'

import * as taskRecipes from '../../tasks/data/recipes'

module.exports = function () {
  const app = this
  app.service('agents').hooks(hooks)
}

const hooks = {
  after: {
    create: [
      createCreateProfileTaskPlan,
      iff(hasNoGroupAgent, createGroupAgent),
      iff(hasNoSupplierAgent, createSupplierAgent),
      iff(groupHasNoAdminRelation, createGroupAdminRelation),
      iff(hasNoRelation, createRelation),
      iff(hasNoOrders, createFirstOrderTaskPlan)
    ]
  }
}

function createCreateProfileTaskPlan (hook) {
  if (hook.result.type === 'person') {
    return hook.app.service('taskPlans').create({
      assigneeId: hook.result.id,
      taskRecipeId: 'createProfile',
      params: {}
    })
    .then(() => {
      return hook.app.service('credentials').get(hook.result.id)
    })
    .then((cred) => {
      // TODO: IK: looks like the email isn't getting attached to the credential correctly, investigate dogstack-agents
      return hook.app.service('mailer').create({
        from: 'hello@cobuy.nz',
        to: cred.email || 'no@email.com',
        subject: 'Test Cobuy SignUp Email',
        html: 'test email'
      })
    })
    .then(() => hook)
  }
}

function hasNoGroupAgent (hook) {
  return isNil(hook.data.consumerAgentId)
}

function createGroupAgent (hook) {
  // also create the relationship between the person and the group after this
  if (hook.result.type === 'person') {
    const agents = hook.app.service('agents')
    return agents.create({ type: 'group' })
    .then((agent) => {
      hook.data.consumerAgentId = agent.id
      return hook
    })
  }
}

function hasNoSupplierAgent (hook) {
  return isNil(hook.data.supplierAgentId)
}

function createSupplierAgent (hook) {
  if (hook.result.type === 'person') {
    const agents = hook.app.service('agents')
    return agents.create({ type: 'group' })
    .then((agent) => {
      hook.data.supplierAgentId = agent.id
      return hook
    })
  }
}

function groupHasNoAdminRelation (hook) {
  if (hook.result.type !== 'person') {
    return false
  }
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  return relationships
    .find({ query: {targetId: groupId} })
    .then(isEmpty)
}

function createGroupAdminRelation (hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  const assigneeId = hook.result.id
  return relationships.create({
    relationshipType: 'admin',
    sourceId: assigneeId,
    targetId: groupId
  }).then(() => {
    return hook
  })
}

function hasNoRelation (hook) {
  if (hook.result.type !== 'person') {
    return false
  }
  const relationships = hook.app.service('relationships')
  const supplierAgentId = hook.data.supplierAgentId
  return relationships.find({ query: { sourceId: supplierAgentId }  }).then((relationship)=>{
    return isEmpty(relationship)
  })
}

function createRelation (hook) {
  const relationships = hook.app.service('relationships')
  const consumerAgentId = hook.data.consumerAgentId
  const supplierAgentId = hook.data.supplierAgentId
  return relationships.create({
    relationshipType: 'supplier',
    sourceId: supplierAgentId,
    targetId: consumerAgentId
  })
  .then(() => {
    return hook
  })
}

function hasNoOrders (hook) {
  if (hook.result.type !== 'person') {
    return false
  }
  const hasLengthZero = pipe(length, equals(0))

  const orders = hook.app.service('orders')
  const consumerAgentId = hook.data.consumerAgentId
  return orders.find({ query: { consumerAgentId } })
  .then(hasLengthZero)
}

function createFirstOrderTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.createFirstOrder.id

  // TODO: add beforeAll hook to get agent
  // const assigneeId = hook.params.agent.id

  const assigneeId = hook.result.id
  const params = {
    consumerAgentId: hook.data.consumerAgentId,
    supplierAgentId: hook.data.supplierAgentId
  }
  return taskPlans.create({ taskRecipeId, params, assigneeId })
  .then(() => {
    return hook
  })
}
