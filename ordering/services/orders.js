const feathersKnex = require('feathers-knex')
const { iff, iffElse } = require('feathers-hooks-common')
import { pipe, equals, length, isNil, isEmpty, map, any, find, not, prop, all, flatten } from 'ramda'
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
      iff(hasNoGroupAgent, createGroupAgent),
      iff(hasNoSupplierAgent, createSupplierAgent),
      iff(hasNoRelation, createRelation),
      iff(groupHasNoAdminRelation, createGroupAdminRelation),
      iff(userIsNotMemberOfGroup, createGroupMemberRelation)
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
  console.log('hook params', hook.params)
  console.log('hook data', hook.data)

  // GK: this is weeeeeird! the current user id isn't even part of this query?
  const groupId = hook.data.consumerAgentId
  relationships
    .find({ query: { sourceId: groupId, relationshipType: 'member' } })
    .then(isEmpty)
    .then((result) => {
      console.log('userIsNotMemberOfGroup', result)
      return result
    })
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
  relationships
    .find({ query: { sourceId: groupId, relationshipType: 'admin' } })
    .then(isEmpty)
    .then((result) => {
      console.log('groupHasNoAdminRelation', result)
      return result
    })
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

function createGroupAgent (hook) {
  const agents = hook.app.service('agents')
  return agents.create({ type: 'group' })
  .then((agent) => {
    hook.data.consumerAgentId = agent.id
    return hook
  })
}

function hasNoGroupAgent (hook) {
  const hasNoGroupAgent = isNil(hook.data.consumerAgentId)
  console.log('hasNoGroupAgent', hasNoGroupAgent)
  return hasNoGroupAgent
}

function hasNoRelation (hook) {
  const relationships = hook.app.service('relationships')
  const supplierAgentId = hook.data.supplierAgentId
  relationships
    .find({ query: { sourceId: supplierAgentId } })
    .then(isEmpty)
    .then((result) => {
      console.log('hasNoRelation', result)
      return result
    })
}

function createRelation (hook) {
  const relationships = hook.app.service('relationships')
  const consumerAgentId = hook.data.consumerAgentId
  const supplierAgentId = hook.data.supplierAgentId
  return relationships.create({
    relationshipType: 'supplier',
    sourceId: consumerAgentId,
    targetId: supplierAgentId
  }).then(() => {
    return hook
  })
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
  const hasNoSupplierAgent = isNil(hook.data.supplierAgentId)
  console.log('hasNoSupplierAgent', hasNoSupplierAgent)
  return hasNoSupplierAgent
}

function hasNotCompletedGroupOrSupplierProfile (hook) {
  const agentId = hook.params.agent.id
  const relationshipsService = hook.app.service('relationships')
  const profilesService = hook.app.service('profiles')

  return relationshipsService.find({ query: { targetId: agentId, relationshipType: 'admin' }})
  .then(groupRelationships => {
    const groupIds = map((relationship) => { return relationship.sourceId }, groupRelationships)
    return relationshipsService.find({ query: { sourceId: { $in: groupIds }, relationshipType: 'supplier' }})
    .then((supplierRelationships) => {
      const supplierIds = map((relationship) => { return relationship.sourceId }, supplierRelationships)
      return Promise.all([
        profilesService.find({ query: { agentId: { $in: groupIds }}}),
        profilesService.find({ query: { agentId: { $in: supplierIds }}})
      ])
    })
  })
  .then(groupAndSupplierProfiles => {
    console.log('combined array of group and supplier profiles', flatten(groupAndSupplierProfiles))
    const profileNames = map((profile) => { return profile.name }, flatten(groupAndSupplierProfiles))
    console.log('profileNames array', profileNames)
    const namesDoNotExistForSupplierAndGroup = any(
      isNil,
      profileNames
    )
    console.log('names have not been filled out for any supplier/group profile', namesDoNotExistForSupplierAndGroup)
    return namesDoNotExistForSupplierAndGroup
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
