import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersAuth from 'feathers-authentication'
import feathersAuthJwt from 'feathers-authentication-jwt'
import moment from 'moment'

import Tokens from './tokens'
import TokenConsumes from './tokenConsumes'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

var app
var method
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
  app.configure(TokenConsumes)
  app.use('/profiles', {
    patch: function (id, data, params) {
      return method(id, data, params)
    }
  })

  return db.migrate.latest(dbConfig.migrations)
})

test.serial('create new token', t => {
  const result = { wubba: true, lubba: true, dub: 'dub' }
  method = (id, data, params) => {
    t.is(id, 123)
    t.deepEqual(data, { hey: 'byte' })
    t.deepEqual(params, {
      serious: 'yes',
      silly: 'no'
    })
    return Promise.resolve(result)
  }
  return app.service('tokens').create({
    agentId: 0,
    service: 'profiles',
    method: 'patch',
    params: {
      serious: 'yes'
    }
  })
  .then(token => {
    return app.service('tokenConsumes').create({
      tokenId: token.id,
      payload: {
        id: 123,
        data: { hey: 'byte' },
        params: {
          silly: 'no'
        }
      }
    })
  })
  .then(tokenConsume => {
    t.is(tokenConsume.tokenId, 1)
    t.is(tokenConsume.result, result)
    t.true(isAboutNow(tokenConsume.createdAt))
  })
})

function isAboutNow (date) {
  const now = moment.utc()
  const justBeforeNow = moment.utc().subtract(1, 'minute')
  return moment.utc(date).isBetween(justBeforeNow, now)
}
