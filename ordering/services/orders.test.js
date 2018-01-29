import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import { isEmpty } from 'ramda'
import errors from 'feathers-errors'

import Orders from './orders'
import TaskPlans from '../../tasks/services/plans'
import agentsServices from 'dogstack-agents/service'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

// TODO: IK: test the authentication hook works as expected (i.e. can't call any methods without being authenticated)
// TODO: IK: figure out how to reset the incrementing id after each test, brittle tests atm
var app, credential, otherCredential
test.before(() => {
  app = feathers()
    .configure(feathersConfig())
    .configure(feathersHooks())

  const db = createDb(dbConfig)
  app.set('db', db)

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
    // create other test user
    return app.service('credentials').create({
      email: 'tester@tester.com',
      password: 'testing789'
    })
  })
  .then((createdCredential) => {
    otherCredential = createdCredential
    const agent = { id: credential.agentId } // TODO: IK: userIsNotMemberOfGroup hook on orders relies on params.agent.id, part of cleaning up how we pass agent / credential data in app
    // create test data
    const params = { credential, agent }
    return app.service('relationships').create([
      { relationshipType: 'member', sourceId: 2, targetId: credential.agentId },
      { relationshipType: 'admin', sourceId: 4, targetId: credential.agentId },
      { relationshipType: 'member', sourceId: 4, targetId: credential.agentId }
    ], params)
  })
})

test.beforeEach(() => {
  const params = { credential }
  const otherParams = { credential: otherCredential }
  // return app.service('orders').create([
  //   { consumerAgentId: 2, supplierAgentId: 98, adminAgentId: 55, name: 'order1' },
  //   { consumerAgentId: 10, supplierAgentId: 97, adminAgentId: 1, name: 'order2' },
  //   { consumerAgentId: 20, supplierAgentId: 96, adminAgentId: 57, name: 'order3' }
  // ], params)
  // TODO: IK: looks like we must create one-by-one atm, hooks aren't handling arrays being passed to create
  return app.service('orders').create({ consumerAgentId: 2, supplierAgentId: 3, adminAgentId: 1, name: 'order1' }, params)
  .then(() => {
    return app.service('orders').create({ consumerAgentId: 4, supplierAgentId: 5, adminAgentId: 6, name: 'order2' }, otherParams)
  })
  .then(() => {
    return app.service('orders').create({ consumerAgentId: 7, supplierAgentId: 8, adminAgentId: 9, name: 'order3' }, otherParams)
  })
})

test.afterEach(() => {
  return app.service('orders').remove(null, {})
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial('Orders.create: create new order successfully', t => {
  const params = { credential, provider: 'rest' }
  return app.service('orders').create({
    consumerAgentId: 2,
    supplierAgentId: 3,
    adminAgentId: 1,
    name: 'order4'
  }, params)
  .then(order => {
    t.is(order.id, 4)
    t.is(order.consumerAgentId, 2)
    t.is(order.supplierAgentId, 3)
    t.is(order.adminAgentId, 1)
    t.is(order.name, 'order4')
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial("Orders.create: can't create new order if not group admin", t => {
  const params = { credential, provider: 'rest' }
  return t.throws(app.service('orders').create({
    consumerAgentId: 10,
    supplierAgentId: 11,
    adminAgentId: 12,
    name: 'order5'
  }, params))
})

test.serial('Orders.find: may only find orders that relate to groups of current user', t => {
  // simulate client authentication by just passing the credential in params
  const params = { credential, query: {} }
  return app.service('orders').find(params)
  .then(orders => {
    const expected = [
      { id: 8, consumerAgentId: 2, supplierAgentId: 3, adminAgentId: 1, name: 'order1' },
      { id: 9, consumerAgentId: 4, supplierAgentId: 5, adminAgentId: 6, name: 'order2' }
    ]
    t.deepEqual(orders, expected)
  })
})

test.serial('Orders.find: omit unauthorised results if directly specified', t => {
  const params = { credential, query: { consumerAgentId: 7 } }
  return app.service('orders').find(params)
  .then(orders => {
    t.deepEqual(orders, [])
  })
})

test.serial('Orders.get: can get authorised result', t => {
  const params = { credential }
  // TODO: IK: figure out how to reset the incrementing id after each test
  return app.service('orders').get(14, params)
  .then((order) => {
    t.is(order.id, 14)
    t.is(order.consumerAgentId, 2)
    t.is(order.supplierAgentId, 3)
    t.is(order.adminAgentId, 1)
    t.is(order.name, 'order1')
  })
})

test.serial('Orders.get: omit unauthorised results via get', t => {
  const params = { credential }
  return t.throws(app.service('orders').get(19, params), errors.NotFound)
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial('Orders.update: update order as order admin', t => {
  const params = { credential, provider: 'rest' }
  return app.service('orders').update(20, {
    consumerAgentId: 2,
    supplierAgentId: 98,
    adminAgentId: 55,
    name: 'order1UPDATED'
  }, params)
  .then(order => {
    t.is(order.id, 20)
    t.is(order.consumerAgentId, 2)
    t.is(order.supplierAgentId, 98)
    t.is(order.adminAgentId, 55)
    t.is(order.name, 'order1UPDATED')
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial('Orders.update: update order as group admin', t => {
  const params = { credential, provider: 'rest' }
  return app.service('orders').update(23, {
    consumerAgentId: 10,
    supplierAgentId: 97,
    adminAgentId: 1,
    name: 'order1UPDATED'
  }, params)
  .then(order => {
    t.is(order.id, 23)
    t.is(order.consumerAgentId, 10)
    t.is(order.supplierAgentId, 97)
    t.is(order.adminAgentId, 1)
    t.is(order.name, 'order1UPDATED')
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial("Orders.update: can't update order if not order or group admin", t => {
  const params = { credential, provider: 'rest' }
  return t.throws(app.service('orders').update(28, {
    consumerAgentId: 20,
    supplierAgentId: 96,
    adminAgentId: 57,
    name: 'order3SHOULDNTUPDATE'
  }, params))
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial('Orders.remove: remove order as order admin successfully', t => {
  const params = { credential, provider: 'rest' }
  return app.service('orders').remove(29, params)
  .then(removedOrder => {
    t.is(removedOrder.id, 29)
    t.is(removedOrder.consumerAgentId, 2)
    t.is(removedOrder.supplierAgentId, 3)
    t.is(removedOrder.adminAgentId, 1)
    t.is(removedOrder.name, 'order1')
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial('Orders.remove: remove order as group admin successfully', t => {
  const params = { credential, provider: 'rest' }
  return app.service('orders').remove(33, params)
  .then(removedOrder => {
    t.is(removedOrder.id, 33)
    t.is(removedOrder.consumerAgentId, 4)
    t.is(removedOrder.supplierAgentId, 5)
    t.is(removedOrder.adminAgentId, 6)
    t.is(removedOrder.name, 'order2')
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial("Orders.remove: can't remove order if not order or group admin", t => {
  const params = { credential, provider: 'rest' }
  return t.throws(app.service('orders').remove(37, params))
})

// test.todo("Orders.patch: can patch an order if order admin")
// test.todo("Orders.patch: can patch an order if group admin")
// test.todo("Orders.patch: can't patch an order if not group or order admin")
