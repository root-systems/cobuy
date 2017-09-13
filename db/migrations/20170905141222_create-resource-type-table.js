
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('resourceTypes', function (table){
    table.increments('id')
    table.string('name')
    table.text('description')
    table.text('image')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('resourceTypes')
};
