exports.up = function (knex, Promise) {
  return knex.schema.table('taskWorks', function (table) {
    table.string('taskRecipeId')
    table.json('params')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('taskWorks', function (table) {
    table.dropColumn('taskRecipeId')
    table.dropColumn('params')
  })
}
