import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import { isEmpty } from 'ramda'

import OrderPlans from './orderPlans'
import Orders from './orders'
import TaskPlans from '../../tasks/services/plans'
import agentsServices from 'dogstack-agents/service'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

// TODO: IK: test the authentication hook works as expected (i.e. can't call any methods without being authenticated)
// TODO: IK: figure out how to reset the incrementing id after each test, brittle tests atm
var app, credential, client
test.before(() => {
  app = feathers()
    .configure(feathersConfig())
    .configure(feathersHooks())

  const db = createDb(dbConfig)
  app.set('db', db)

  app.configure(OrderPlans)
  app.configure(Orders)
  app.configure(TaskPlans)
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
    // create test data
    const params = { credential }
    return Promise.all([
      app.service('relationships').create({ relationshipType: 'member', sourceId: 99, targetId: credential.agentId }, params),
      app.service('orders').create({ consumerAgentId: 99, supplierAgentId: 98, adminAgentId: 1 }, params)
    ])
  })
})

test.beforeEach(() => {
  const params = { credential }
  return app.service('orderPlans').create([
    { agentId: credential.agentId, quantity: 10, productId: 1, priceSpecId: 1, orderId: 1 },
    { agentId: credential.agentId, quantity: 23, productId: 1, priceSpecId: 2, orderId: 1 },
    { agentId: 99, quantity: 46, productId: 99, priceSpecId: 99, orderId: 99 }
  ], params)
})

test.afterEach(() => {
  return app.service('orderPlans').remove(null, {})
})

test.serial('OrderPlans.create: create new plan successfully', t => {
  return app.service('orderPlans').create({
    agentId: 1,
    quantity: '46', // TODO: IK: this should probably be an integer type, see #490
    productId: 2,
    priceSpecId: 1,
    orderId: 1
  })
  .then(intent => {
    t.is(intent.id, 4)
    t.is(intent.agentId, 1)
    t.is(intent.quantity, '46')
    t.is(intent.productId, 2)
    t.is(intent.priceSpecId, 1)
    t.is(intent.orderId, 1)
  })
})

test.serial('OrderPlans.find: may only find intents that relate to groups of current user', t => {
  // simulate client authentication by just passing the credential in params
  const params = { credential, query: {} }
  return app.service('orderPlans').find(params)
  .then(intents => {
    const expected = [
      { id: 5,
        agentId: 1,
        quantity: '10',
        productId: 1,
        priceSpecId: 1,
        orderId: 1
      },
      { id: 6,
        agentId: 1,
        quantity: '23',
        productId: 1,
        priceSpecId: 2,
        orderId: 1
      }
    ]
    t.deepEqual(intents, expected)
  })
})

test.serial('OrderPlans.find: omit unauthorised results if directly specified by orderId', t => {
  const params = { credential, query: { orderId: 99 } }
  return app.service('orderPlans').find(params)
  .then(intents => {
    t.deepEqual(intents, [])
  })
})

test.serial('OrderPlans.get: can get authorised result', t => {
  const params = { credential }
  // TODO: IK: figure out how to reset the incrementing id after each test
  return app.service('orderPlans').get(12, params)
  .then((intent) => {
    t.is(intent.id, 12)
    t.is(intent.agentId, 1)
    t.is(intent.quantity, '23')
    t.is(intent.productId, 1)
    t.is(intent.priceSpecId, 2)
    t.is(intent.orderId, 1)
  })
})

test.serial('OrderPlans.get: omit unauthorised results via get', t => {
  const params = { credential }
  return t.throws(app.service('orderPlans').get(16, params))
})

// TODO: IK: not sure how to create feathers client correctly to test authentication-related hooks for these tests below
test.todo("OrderPlans.create: can't create new plan if external provider")
test.todo("OrderPlans.update: can update current user plan")
test.todo("OrderPlans.update: can't update a plan for an agentId that isn't current user id")
test.todo("OrderPlans.patch: can patch current user plan")
test.todo("OrderPlans.patch: can't patch a plan for an agentId that isn't current user id")
test.todo("OrderPlans.remove: can remove current user plan")
test.todo("OrderPlans.remove: can't remove a plan for an agentId that isn't current user id")
