import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import { isEmpty } from 'ramda'

import PriceSpecs from './priceSpecs'
// import Orders from './orders'
// import TaskPlans from '../../tasks/services/plans'
import agentsServices from 'dogstack-agents/service'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

// TODO: IK: test the authentication hook works as expected (i.e. can't call any methods without being authenticated)
// TODO: IK: figure out how to reset the incrementing id after each test, brittle tests atm
var app, credential, noGroupCredential
test.before(() => {
  app = feathers()
    .configure(feathersConfig())
    .configure(feathersHooks())

  const db = createDb(dbConfig)
  app.set('db', db)

  app.configure(PriceSpecs)
  // app.configure(Orders)
  // app.configure(TaskPlans)
  agentsServices.call(app)

  app.listen(9000)

  return db.migrate.latest(dbConfig.migrations)
  .then(() => {
    // create test user
    return app.service('credentials').create({
      email: 'test@test.com',
      password: 'testing123'
    })
  })
  .then((createdCredential) => {
    credential = createdCredential
    // create other test user
    return app.service('credentials').create({
      email: 'tester@tester.com',
      password: 'testing789'
    })
  })
  .then((createdCredential) => {
    noGroupCredential = createdCredential
    // create test data
    const params = { credential }
    return app.service('relationships').create([
      { relationshipType: 'admin', sourceId: 2, targetId: credential.agentId },
      { relationshipType: 'member', sourceId: 2, targetId: credential.agentId }
    ], params)
  })
})

test.beforeEach(() => {
  const params = { credential }
  return app.service('priceSpecs').create([
    { productId: 1, minimum: 5, price: 10, currency: 'NZD' },
    { productId: 1, minimum: 10, price: 2, currency: 'NZD' },
    { productId: 2, minimum: 1, price: 100, currency: 'NZD' }
  ], params)
})

test.afterEach(() => {
  return app.service('priceSpecs').remove(null, {})
})

test.serial('PriceSpecs.create: create new priceSpec successfully', t => {
  const params = { credential, provider: 'rest' }
  return app.service('priceSpecs').create({
    productId: 2,
    minimum: "23",
    price: "10",
    currency: 'NZD'
  }, params)
  .then(priceSpec => {
    t.is(priceSpec.id, 4)
    t.is(priceSpec.productId, 2)
    t.is(priceSpec.minimum, "23")
    t.is(priceSpec.price, "10")
    t.is(priceSpec.currency, 'NZD')
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial("PriceSpecs.create: can't create new priceSpec if not a group admin", t => {
  const params = { noGroupCredential, provider: 'rest' }
  return t.throws(app.service('priceSpecs').create({
    productId: 3,
    minimum: 2,
    price: 30,
    currency: 'NZD'
  }, params))
})

// test.skip('PriceSpecs.find: may only find priceSpecs that relate to products of suppliers of groups of current user', t => {
  // const params = { credential, query: {} }
  // return app.service('priceSpecs').find(params)
  // .then(plans => {
  //   const expected = [
  //     { id: 5,
  //       agentId: 1,
  //       quantity: '10',
  //       productId: 1,
  //       priceSpecId: 1,
  //       orderId: 1
  //     },
  //     { id: 6,
  //       agentId: 1,
  //       quantity: '23',
  //       productId: 1,
  //       priceSpecId: 2,
  //       orderId: 1
  //     }
  //   ]
  //   t.deepEqual(plans, expected)
  // })
// })
//
// test.skip('PriceSpecs.find: omit unauthorised results', t => {
  // const params = { credential, query: { orderId: 99 } }
  // return app.service('priceSpecs').find(params)
  // .then(plans => {
  //   t.deepEqual(plans, [])
  // })
// })

// test.serial('PriceSpecs.get: can get authorised result', t => {
//   const params = { credential }
//   // TODO: IK: figure out how to reset the incrementing id after each test
//   return app.service('priceSpecs').get(12, params)
//   .then((plan) => {
//     t.is(plan.id, 12)
//     t.is(plan.agentId, 1)
//     t.is(plan.quantity, '23')
//     t.is(plan.productId, 1)
//     t.is(plan.priceSpecId, 2)
//     t.is(plan.orderId, 1)
//   })
// })
//
// test.serial('PriceSpecs.get: omit unauthorised results via get', t => {
//   const params = { credential }
//   return t.throws(app.service('priceSpecs').get(16, params))
// })

// TODO: IK: not sure how to create feathers client correctly to test authentication-related hooks for these tests below
// test.todo("PriceSpecs.create: can't create new plan if external provider")
// test.todo("PriceSpecs.update: can update current user plan")
// test.todo("PriceSpecs.update: can't update a plan for an agentId that isn't current user id")
// test.todo("PriceSpecs.patch: can patch current user plan")
// test.todo("PriceSpecs.patch: can't patch a plan for an agentId that isn't current user id")
// test.todo("PriceSpecs.remove: can remove current user plan")
// test.todo("PriceSpecs.remove: can't remove a plan for an agentId that isn't current user id")
