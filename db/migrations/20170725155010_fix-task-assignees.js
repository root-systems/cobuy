exports.up = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    table.dropColumn('assignee')
    table.integer('assigneeId').references('agents.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('taskPlans', function (table) {
    // TODO: this can't be made notNullable again unless we provide a default value
    table.string('assignee')
    table.dropColumn('assigneeId')
  })
}
