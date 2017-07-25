const feathersKnex = require('feathers-knex')
const { iff } = require('feathers-hooks-common')
import { isNil } from 'ramda'

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
  after: {},
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
