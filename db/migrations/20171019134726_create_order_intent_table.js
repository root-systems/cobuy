exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('orderIntents', function (table) {
      table.increments('id')
      table.integer('agentId').references('agents.id')
      table.integer('desiredQuantity')
      table.integer('productId')
      table.integer('priceSpecId')
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('orderIntents')
};
