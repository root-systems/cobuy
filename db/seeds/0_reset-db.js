exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('credentials').del(),
    knex('profiles').del(),
    knex('taskWorks').del(),
    knex('priceSpecs').del(),
    knex('orderIntents').del(),
    knex('orderPlans').del(),
    knex('relationships').del(),
    knex('tokenConsumes').del()
  ]).then(() => Promise.all([
    knex('taskPlans').del(),
    knex('products').del(),
    knex('orders').del(),
    knex('tokens').del()
  ])).then(() => Promise.all([
    knex('resourceTypes').del(),
    knex('agents').del()
  ]))
}
