exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('taskPlans', function (table) {
      table.increments('id')
      table.string('taskRecipeId').notNullable()
      table.string('assignee').notNullable()
    }),
    knex.schema.createTableIfNotExists('taskWorks', function (table) {
      table.increments('id')
      table.integer('taskPlanId').references('taskPlans.id').notNullable()
      table.integer('workerAgentId').references('agents.id').notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return (
    knex.schema.dropTableIfExists('taskWorks')
  ).then(() => (
    knex.schema.dropTableIfExists('taskPlans')
  ))
}
