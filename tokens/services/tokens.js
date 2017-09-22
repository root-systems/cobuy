import feathersKnex from 'feathers-knex'
import {} from 'feathers-hooks-common'
import {} from 'ramda'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'tokens'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {},
  after: {},
  error: {}
}
