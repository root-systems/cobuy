import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import { isEmpty } from 'ramda'

import TaskPlans from './plans'
// import Orders from './orders'
// import ResourceTypes from '../../resources/services/resourceTypes'
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

  app.configure(TaskPlans)
  // app.configure(Orders)
  // app.configure(ResourceTypes)
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
  return app.service('taskPlans').create([
    { taskRecipeId: 1, parentTaskPlanId: null, params: {}, assigneeId: 1 },
    { taskRecipeId: 2, parentTaskPlanId: null, params: {}, assigneeId: 1 },
    { taskRecipeId: 2, parentTaskPlanId: null, params: {}, assigneeId: 2 }
  ], params)
})

test.afterEach(() => {
  return app.service('taskPlans').remove(null, {})
})

test.serial('TaskPlans.create: create new plan successfully', t => {
  const params = { credential, provider: 'rest' }
  return app.service('taskPlans').create({
    taskRecipeId: 3,
    parentTaskPlanId: null,
    params: {},
    assigneeId: 2
  }, params)
  .then(plan => {
    t.is(plan.id, 4)
    t.is(plan.parentTaskPlanId, null)
    t.is(plan.params, {})
    t.is(plan.assigneeId, 2)
  })
})

// TODO: IK: need a working test client that provides auth token for this test
// can manually test by temp removing authenticate('jwt') from service
test.serial("TaskPlans.create: can't create new plan if not a group admin", t => {
  const params = { noGroupCredential, provider: 'rest' }
  return t.throws(app.service('taskPlans').create({
    resourceTypeId: 3,
    supplierAgentId: 2
  }, params))
})

test.serial('TaskPlans.find: may only find taskPlans that relate to suppliers of groups of current user', t => {
  const params = { credential, query: {}, provider: 'rest' }
  return app.service('taskPlans').find(params)
  .then(taskPlans => {
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
    t.deepEqual(taskPlans, expected)
  })
})

test.serial('TaskPlans.find: omit unauthorised results', t => {
  const params = { credential, query: { resourceTypeId: 100 }, provider: 'rest' }
  return app.service('taskPlans').find(params)
  .then(taskPlans => {
    t.deepEqual(taskPlans, [])
  })
})

test.serial('TaskPlans.get: can get authorised result', t => {
  const params = { credential, provider: 'rest' }
  // TODO: IK: figure out how to reset the incrementing id after each test
  return app.service('taskPlans').get(14, params)
  .then((plan) => {
    t.is(plan.id, 14)
    t.is(plan.resourceTypeId, 10)
    t.is(plan.supplierAgentId, 4)
  })
})

test.serial('TaskPlans.get: omit unauthorised results via get', t => {
  const params = { credential, provider: 'rest' }
  return t.throws(app.service('taskPlans').get(19, params))
})

// TODO: IK: not sure how to create feathers client correctly to test authentication-related hooks for these tests below
// test.todo("TaskPlans.create: can't create new plan if external provider")
// test.todo("TaskPlans.update: can update current user plan")
// test.todo("TaskPlans.update: can't update a plan for an agentId that isn't current user id")
// test.todo("TaskPlans.patch: can patch current user plan")
// test.todo("TaskPlans.patch: can't patch a plan for an agentId that isn't current user id")
// test.todo("TaskPlans.remove: can remove current user plan")
// test.todo("TaskPlans.remove: can't remove a plan for an agentId that isn't current user id")
