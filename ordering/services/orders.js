const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { pipe, equals, length, isNil } from 'ramda'
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
      iff(hasNoGroupAgent, createGroupAgent)
    ]
  },
  after: {
    create: [
      iff(hasOneOrder, createPrereqTaskPlan)
    ]
  },
  error: {}
}

function createGroupAgent (hook) {
  const agents = hook.app.service('agents')
  return agents.create({ type: 'group' })
  .then((agent) => {
    hook.data.agentId = agent.id
    return hook
  })
}

function hasNoGroupAgent (hook) {
  return isNil(hook.data.agentId)
}

const hasLengthOne = pipe(length, equals(1))

function hasOneOrder (hook) {
  const orders = hook.app.service('orders')
  const agentId = hook.data.agentId
  return orders.find({ query: { agentId } })
  .then(hasLengthOne)
}

function createPrereqTaskPlan (hook) {
  const taskPlans = hook.app.service('taskPlans')
  const taskRecipeId = taskRecipes.finishPrereqs.id

  // TODO: add beforeAll hook to get agent
  // const assigneeId = hook.params.agent.id

  const assigneeId = hook.params.credential.agentId
  const params = JSON.stringify({
    contextAgentId: hook.data.agentId
  })
  return taskPlans.create({ taskRecipeId, params, assigneeId })
  .then(() => {
    return hook
  })
}
