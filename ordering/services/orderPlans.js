const feathersKnex = require('feathers-knex')

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'orderPlans'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
}
