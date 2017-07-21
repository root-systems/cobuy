exports.up = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.json('params').references('taskPlans.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.dropColumn('params')
  })
}
