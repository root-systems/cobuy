
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('products', function (table){
    table.increments('id')
    table.integer('resourceTypeId').references('resourceTypes.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('products')
};
