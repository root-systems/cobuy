exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.text('address')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function (table) {
    table.dropColumn('address')
  })
}
