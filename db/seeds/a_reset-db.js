exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('taskPlans').del(),
    knex('agents').del(),
    knex('credentials').del(),
    knex('profiles').del()
  ])
}
