exports.up = function (knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.renameColumn('agentId', 'consumerAgentId')
    table.integer('supplierAgentId').references('agents.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.renameColumn('consumerAgentId', 'agentId')
    table.dropColumn('supplierAgentId')
  })
}
