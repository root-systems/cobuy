exports.up = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.dropColumn('assignee')
    table.integer('assigneeId').references('agents.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.string('assignee').notNullable()
    table.dropColumn('assigneeId')
  })
}
