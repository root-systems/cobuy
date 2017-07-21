exports.up = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.integer('parentTaskPlanId').references('taskPlans.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.dropColumn('parentTaskPlanId')
  })
}
