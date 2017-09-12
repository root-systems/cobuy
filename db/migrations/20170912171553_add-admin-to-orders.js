exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function(table){
    table.integer('adminAgentId').references('agents.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function(table){
    table.dropColumn('adminAgentId')
  })
};
