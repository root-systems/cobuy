exports.up = function(knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', function (table) {
    table.dropColumn('name')
  })
};
