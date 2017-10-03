import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import moment from 'moment'

import Tokens from './tokens'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

var app
test.before(() => {
  app = feathers()
    .configure(feathersConfig())
    .configure(feathersHooks())

  app
    .configure(feathersAuth(app.get('authentication')))
    .configure(feathersAuthJwt())

  const db = createDb(dbConfig)
  app.set('db', db)

  app.configure(Tokens)

  return db.migrate.latest(dbConfig.migrations)
})

test.serial('create new token', t => {
  return app.service('tokens').create({
    agentId: 0,
    service: 'profiles',
    method: 'patch',
    params: {
      stuff: 'yes'
    }
  })
  .then(token => {
    t.is(token.id, 1)
    t.is(token.agentId, 0)
    t.is(token.service, 'profiles')
    t.is(token.method, 'patch')
    t.deepEqual(token.params, { stuff: 'yes' })
    t.true(isAboutNow(token.createdAt))
    t.is(typeof token.jwt, 'string')

    const jwtOptions = Tokens.getJwtOptions(app)
    return app.passport.verifyJWT(token.jwt, jwtOptions)
  })
  .then(payload => {
    t.is(payload.tokenId, 1)
  })
})

function isAboutNow (date) {
  const now = moment.utc()
  const justBeforeNow = moment.utc().subtract(1, 'minute')
  return moment.utc(date).isBetween(justBeforeNow, now)
}

test.serial('create existing token', t => {
  return app.service('tokens').create({
    agentId: 0,
    service: 'profiles',
    method: 'patch',
    params: {
      stuff: 'yes'
    }
  })
  .then(token => {
    t.is(token.id, 1)
  })
})


test.serial('create another token with different params', t => {
  return app.service('tokens').create({
    agentId: 0,
    service: 'profiles',
    method: 'patch',
    params: {
      stuff: 'no'
    }
  })
  .then(token => {
    t.is(token.id, 2)
  })
})

test.serial('create another token from different agent', t => {
  return app.service('tokens').create({
    agentId: 1,
    service: 'profiles',
    method: 'patch',
    params: {
      stuff: 'yes'
    }
  })
  .then(token => {
    t.is(token.id, 3)
  })
})
