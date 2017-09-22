exports.up = function (knex, Promise) {
  return (
    knex.schema.createTableIfNotExists('tokens', function (table) {
      table.increments('id')
      table.integer('agentId').references('agents.id').notNullable()
      table.string('service').notNullable()
      table.enum('method', ['find', 'get', 'create', 'update', 'patch', 'remove']).notNullable()
      table.json('params')
      table.text('jwt')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    }) 
  )
  .then(() => (
    knex.schema.createTableIfNotExists('tokenConsumes', function (table) {
      table.increments('id')
      table.integer('tokenId').references('tokens.id').notNullable()
      table.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  ))
}

exports.down = function (knex, Promise) {
  return (
    knex.schema.dropTableIfExists('tokenConsumes')
  ).then(() => (
    knex.schema.dropTableIfExists('tokens')
  ))
}
