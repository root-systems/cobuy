exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('relationships', function (table) {
    table.increments('id')
    table.string('relationshipType')
    table.integer('sourceId').references('agents.id')
    table.integer('targetId').references('agents.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('relationships')
}
