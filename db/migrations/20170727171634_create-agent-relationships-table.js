exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('relationships', function (table) {
    table.increments('id')
    table.string('relationshipType')
    table.integer('source')
    table.integer('target')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('relationships')
}
