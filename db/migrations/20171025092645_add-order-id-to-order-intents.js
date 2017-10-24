
exports.up = function(knex, Promise) {
  return knex.schema.table('orderIntents', function (table) {
    table.integer('orderId').references('orders.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orderIntents', function (table) {
    table.dropColumn('orderId')
  })
};
