exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('orders', function (table) {
    table.increments('id')
    table.integer('agentId').references('agents.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('orders')
}
