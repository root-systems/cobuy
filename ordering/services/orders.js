const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { pipe, equals, length, isNil, isEmpty } from 'ramda'
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
      iff(groupHasNoAdminRelation,createGroupAdminRelation)
    ]
  },
  after: {
    create: [
      createCastIntentTaskPlan,
      iff(hasOneOrder, createPrereqTaskPlan)
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

function groupHasNoAdminRelation(hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  return relationships
    .find({ query: {targetId: groupId} })
    .then(isEmpty)
}

function createGroupAdminRelation(hook) {
  const relationships = hook.app.service('relationships')
  const groupId = hook.data.consumerAgentId
  const userId =  hook.params.agent.id
  return relationships.create({
    relationshipType: 'admin',
    sourceId: userId,
    targetId: groupId
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
  return isNil(hook.data.consumerAgentId)
}

function hasNoRelation (hook) {
  const relationships = hook.app.service('relationships')
  const supplierAgentId = hook.data.supplierAgentId
  return relationships.find({ query: { sourceId: supplierAgentId }  }).then((relationship)=>{
    return isEmpty(relationship)
  })
}

function createRelation (hook){
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
  return isNil(hook.data.supplierAgentId)
}

function createCastIntentTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.castIntent.id

  // TODO: add beforeAll hook to get agent
  // const assigneeId = hook.params.agent.id

  const assigneeId = hook.params.credential.agentId
  const params = {
    consumerAgentId: hook.data.consumerAgentId
  }

  return taskPlans.create({ taskRecipeId, params, assigneeId })
  .then(() => {
    return hook
  })
}
