import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import { isEmpty } from 'ramda'

import OrderIntents from './orderIntents'
import Orders from './orders'
import TaskPlans from '../../tasks/services/plans'
import agentsServices from 'dogstack-agents/service'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

// TODO: IK: test the authentication hook works as expected (i.e. can't call any methods without being authenticated)
var app, credential
test.before(() => {
  app = feathers()
    .configure(feathersConfig())
    .configure(feathersHooks())

  const db = createDb(dbConfig)
  app.set('db', db)

  app.configure(OrderIntents)
  app.configure(Orders)
  app.configure(TaskPlans)
  agentsServices.call(app)

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
  return app.service('orderIntents').create([
    { agentId: credential.agentId, desiredQuantity: 10, productId: 1, priceSpecId: 1, orderId: 1 },
    { agentId: credential.agentId, desiredQuantity: 23, productId: 1, priceSpecId: 2,orderId: 1 },
    { agentId: 99, desiredQuantity: 46, productId: 99, priceSpecId: 99, orderId: 99 }
  ], params)
})

test.afterEach(() => {
  return app.service('orderIntents').remove(null, {})
})

test.serial('OrderIntents: create new intent successfully', t => {
  return app.service('orderIntents').create({
    agentId: 1,
    desiredQuantity: 46,
    productId: 2,
    priceSpecId: 1,
    orderId: 1
  })
  .then(intent => {
    t.is(intent.id, 4)
    t.is(intent.agentId, 1)
    t.is(intent.desiredQuantity, 46)
    t.is(intent.productId, 2)
    t.is(intent.priceSpecId, 1)
    t.is(intent.orderId, 1)
  })
})

test.serial('OrderIntents: may only find intents that relate to groups of current user', t => {
  // simulate client authentication by just passing the credential in params
  const params = { credential, query: {} }
  return app.service('orderIntents').find(params)
  .then(intents => {
    const expected = [
      { id: 5,
        agentId: 1,
        desiredQuantity: 10,
        productId: 1,
        priceSpecId: 1,
        orderId: 1
      },
      { id: 6,
        agentId: 1,
        desiredQuantity: 23,
        productId: 1,
        priceSpecId: 2,
        orderId: 1
      }
    ]
    t.deepEqual(intents, expected)
  })
})
