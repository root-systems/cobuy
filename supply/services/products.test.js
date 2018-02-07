import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import { isEmpty } from 'ramda'

import Products from './products'
// import Orders from './orders'
import ResourceTypes from '../../resources/services/resourceTypes'
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

  app.configure(Products)
  // app.configure(Orders)
  app.configure(ResourceTypes)
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
      { relationshipType: 'admin', sourceId: 3, targetId: credential.agentId },
      { relationshipType: 'member', sourceId: 3, targetId: credential.agentId },
      { relationshipType: 'supplier', sourceId: 3, targetId: 4 }
    ], params)
  })
})

test.beforeEach(() => {
  const params = { credential }
  return app.service('products').create([
    { resourceTypeId: 10, supplierAgentId: 4 },
    { resourceTypeId: 2, supplierAgentId: 4 },
    { resourceTypeId: 100, supplierAgentId: 5 }
  ], params)
})

test.afterEach(() => {
  return app.service('products').remove(null, {})
})

test.serial('Products.create: create new product successfully', t => {
  const params = { credential, provider: 'rest' }
  return app.service('products').create({
    resourceTypeId: 20,
    supplierAgentId: 23,
  }, params)
  .then(product => {
    t.is(product.id, 4)
    t.is(product.resourceTypeId, 20)
    t.is(product.supplierAgentId, 23)
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial("Products.create: can't create new product if not a group admin", t => {
  const params = { noGroupCredential, provider: 'rest' }
  return t.throws(app.service('products').create({
    resourceTypeId: 3,
    supplierAgentId: 2
  }, params))
})

test.serial('Products.find: may only find products that relate to suppliers of groups of current user', t => {
  const params = { credential, query: {}, provider: 'rest' }
  return app.service('products').find(params)
  .then(products => {
    const expected = [
      { id: 8,
        resourceTypeId: 10,
        supplierAgentId: 4,
      },
      { id: 9,
        resourceTypeId: 2,
        supplierAgentId: 4,
      }
    ]
    t.deepEqual(products, expected)
  })
})

test.serial('Products.find: omit unauthorised results', t => {
  const params = { credential, query: { resourceTypeId: 100 }, provider: 'rest' }
  return app.service('products').find(params)
  .then(products => {
    t.deepEqual(products, [])
  })
})

test.serial('Products.get: can get authorised result', t => {
  const params = { credential, provider: 'rest' }
  // TODO: IK: figure out how to reset the incrementing id after each test
  return app.service('products').get(14, params)
  .then((product) => {
    t.is(product.id, 14)
    t.is(product.resourceTypeId, 10)
    t.is(product.supplierAgentId, 4)
  })
})

test.serial('Products.get: omit unauthorised results via get', t => {
  const params = { credential, provider: 'rest' }
  return t.throws(app.service('products').get(19, params))
})

// TODO: IK: not sure how to create feathers client correctly to test authentication-related hooks for these tests below
// test.todo("Products.create: can't create new product if external provider")
// test.todo("Products.update: can update current user product")
// test.todo("Products.update: can't update a product for an agentId that isn't current user id")
// test.todo("Products.patch: can patch current user product")
// test.todo("Products.patch: can't patch a product for an agentId that isn't current user id")
// test.todo("Products.remove: can remove current user product")
// test.todo("Products.remove: can't remove a product for an agentId that isn't current user id")
