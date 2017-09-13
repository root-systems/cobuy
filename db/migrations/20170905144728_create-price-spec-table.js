
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('priceSpecs', function (table){
    table.increments('id')
    table.integer('productId').references('products.id')
    table.string('minimum')
    table.string('price')
    table.string('currency')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('priceSpecs')
};
