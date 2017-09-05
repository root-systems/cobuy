
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('priceSpec', function (table){
    table.increments('productId')
    table.string('minimum')
    table.string('price')
    table.string('currency')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('priceSpec')
};
