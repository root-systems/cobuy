exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('orderPlans', function (table) {
      table.increments('id')
      table.integer('orderId').references('orders.id')
      table.integer('agentId').references('agents.id')
      table.integer('quantity')
      table.integer('productId')
      table.integer('priceSpecId')
    })
  ])
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('orderIntents')
}