const feathersKnex = require('feathers-knex')
const { iff, iffElse } = require('feathers-hooks-common')
import { pipe, equals, length, isNil, isEmpty, map, any, find, not, prop } from 'ramda'
import * as taskRecipes from '../../tasks/data/recipes'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'orders'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {
    create: [
      getCurrentUser,
      iff(hasNoConsumerAgent, createConsumerAgent),
      iff(hasNoSupplierAgent, createSupplierAgent),
      iff(hasNoSupplierRelation, createSupplierRelation),
      iff(groupHasNoAdminRelation, createGroupAdminRelation), // TODO this should be agent.create hook
      iff(userIsNotMemberOfGroup, createGroupMemberRelation), // TODO this should be agent.create hook
      iff(hasNoAdminAgent, createAdminAgent)
    ]
  },
  after: {
    create: [
      iffElse(hasNotCompletedGroupOrSupplierProfile, createCompleteOrderSetupWithPreReqsTaskPlan, createCompleteOrderSetupTaskPlan)
    ]
  },
  error: {}
}

function getCurrentUser (hook) {
  const { agentId } = hook.params.credential
  const agentsService = hook.app.service('agents')
  return agentsService.get(agentId)
 .then(agent => {
   hook.params.agent = agent
 })
 .then(() => hook)
}

function userIsNotMemberOfGroup (hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  return relationships
    .find({ query: { sourceId: groupId, relationshipType: 'member' } })
    .then(isEmpty)
}

function createGroupMemberRelation (hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  const userId = hook.params.agent.id
  return relationships.create({
    relationshipType: 'member',
    sourceId: groupId,
    targetId: userId
  }).then(() => {
    return hook
  })
}

function groupHasNoAdminRelation (hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  return relationships
    .find({ query: { sourceId: groupId, relationshipType: 'admin' } })
    .then(isEmpty)
}

function createGroupAdminRelation (hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  const userId = hook.params.agent.id
  return relationships.create({
    relationshipType: 'admin',
    sourceId: groupId,
    targetId: userId
  }).then(() => {
    return hook
  })
}

function createConsumerAgent (hook) {
  const agents = hook.app.service('agents')
  return agents.create({ type: 'group' })
  .then((agent) => {
    hook.data.consumerAgentId = agent.id
    return hook
  })
}

function hasNoConsumerAgent (hook) {
  return isNil(hook.data.consumerAgentId)
}

function hasNoSupplierRelation (hook) {
  const relationships = hook.app.service('relationships')
  const supplierAgentId = hook.data.supplierAgentId
  return relationships
  .find({ query: { sourceId: supplierAgentId } })
  .then(isEmpty)
}

function createSupplierRelation (hook) {
  const relationships = hook.app.service('relationships')
  const consumerAgentId = hook.data.consumerAgentId
  const supplierAgentId = hook.data.supplierAgentId
  return relationships.create({
    relationshipType: 'supplier',
    sourceId: consumerAgentId,
    targetId: supplierAgentId
  })
  .then(() => hook)
}

const hasLengthOne = pipe(length, equals(1))

function hasOneOrder (hook) {
  const orders = hook.app.service('orders')
  const consumerAgentId = hook.data.consumerAgentId
  return orders.find({ query: { consumerAgentId } })
  .then(hasLengthOne)
}

function createPrereqTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.finishPrereqs.id

  // TODO: add beforeAll hook to get agent
  // const assigneeId = hook.params.agent.id

  const assigneeId = hook.params.credential.agentId
  const params = {
    consumerAgentId: hook.data.consumerAgentId,
    supplierAgentId: hook.data.supplierAgentId
  }
  return taskPlans.create({ taskRecipeId, params, assigneeId })
  .then(() => {
    return hook
  })
}

function createSupplierAgent (hook) {
  const agents = hook.app.service('agents')
  return agents.create({ type: 'group' })
  .then((agent) => {
    hook.data.supplierAgentId = agent.id
    return hook
  })
}

function hasNoSupplierAgent (hook) {
  return isNil(hook.data.supplierAgentId)
}

function createAdminAgent (hook) {
  hook.data.adminAgentId = hook.params.agent.id
  return hook
}


function hasNoAdminAgent (hook) {
  return isNil(hook.data.adminAgentId)
}

function hasNotCompletedGroupOrSupplierProfile (hook) {
  const agentId = hook.params.agent.id
  const relationshipsService = hook.app.service('relationships')
  const profilesService = hook.app.service('profiles')

  return relationshipsService.find({ query: { sourceId: agentId, relationshipType: 'admin' }})
  .then(groupRelationships => {
    const groupIds = map((relationship) => { return relationship.targetId }, groupRelationships)
    return relationshipsService.find({ query: { targetId: { $in: groupIds }, relationshipType: 'supplier' }})
    .then((supplierRelationships) => {
      const supplierIds = map((relationship) => { return relationship.sourceId }, supplierRelationships)
      return Promise.all([
        profilesService.find({ query: { agentId: { $in: groupIds }}}),
        profilesService.find({ query: { agentId: { $in: supplierIds }}})
      ])
    })
  })
  .then(profilesArray => {
    // TODO: IK: need to return true if either the 'find' for group profiles with a name OR supplier profiles with a name returns true
    return any(
      isNil,
      map((profiles) => {
        find(pipe(prop('name'), isNil, not))
      }, profilesArray)
    )
  })
}

function createCompleteOrderSetupWithPreReqsTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.completeOrderSetupWithPrereqs.id

  const assigneeId = hook.params.agent.id

  let params = {
    consumerAgentId: hook.data.consumerAgentId,
    supplierAgentId: hook.data.supplierAgentId,
    orderId: hook.result.id
  }
  return taskPlans.create({ taskRecipeId, params, assigneeId })
   .then(() => {
     return hook
   })
}

function createCompleteOrderSetupTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.completeOrderSetup.id

  const assigneeId = hook.params.agent.id

  let params = {
    consumerAgentId: hook.data.consumerAgentId,
    supplierAgentId: hook.data.supplierAgentId,
    orderId: hook.result.id
  }
  return taskPlans.create({ taskRecipeId, params, assigneeId })
   .then(() => {
     return hook
   })
}
