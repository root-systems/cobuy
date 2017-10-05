
exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.text('email')
    table.text('website')
    table.text('phone')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function (table) {
    table.dropColumn('email')
    table.dropColumn('website')
    table.dropColumn('phone')
  })
};
