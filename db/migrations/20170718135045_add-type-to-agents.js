// TODO move to `dogstack-agents`

exports.up = function (knex, Promise) {
  return knex.schema.table('agents', function (table) {
    table.enum('type', ['person', 'group', 'bot']).defaultTo('person')
  }).then(() => {
    return knex('agents').update({ type: 'person' })
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('agents', function (table) {
    table.dropColumn('type')
  })
}
