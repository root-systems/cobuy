import feathersKnex from 'feathers-knex'
import { disallow, isProvider, iff, validateSchema } from 'feathers-hooks-common'
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import tokenSchema from '../schemas/token'
import { pipe, map, prop, toPairs, reduce, reduced, filter, ifElse, isNil, and } from 'ramda'

import { encode as encodeParams, decode as decodeParams } from '../../lib/paramsCodec'
import ajv from '../../app/schemas'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'tokens'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

module.exports.getJwtOptions = getJwtOptions

const hooks = {
  before: {
    find: iff(isProvider('external', disallow())), // TODO: IK: think this is incorrect syntax, see https://feathers-plus.github.io/v1/feathers-hooks-common/index.html#isprovider
    get: [],
    create: [
      authenticate('jwt'),
      setCurrentAgent,
      validateSchema(tokenSchema, ajv),
      getTokenFromPayload,
      encodeParams
    ],
    update: disallow(),
    patch: iff(isProvider('external', disallow())), // TODO: IK: think this is incorrect syntax, see https://feathers-plus.github.io/v1/feathers-hooks-common/index.html#isprovider
    remove: disallow()
  },
  after: {
    all: [
      decodeParams
    ],
    create: [
      createJwt
    ]
  },
  error: {}
}

function setCurrentAgent (hook) {
  if (!hook.params.agent) return hook
  hook.data.agentId = hook.params.agent.id
  return hook
}

const paramsMatcher = (params) => pipe(
  prop('params'),
  ifElse( // early return for both params are nil
    (otherParams) => and(isNil(params), isNil(otherParams)),
    () => true,
    ifElse( // early return for only otherParams is nil
      isNil,
      () => false,
      pipe( // check if all params match
        toPairs,
        reduce((sofar, [key, value]) => {
          if (params[key] !== value) {
            return reduced(false)
          }
          return true
        }, true)
      )
    )
  )
)

function getTokenFromPayload (hook) {
  const { agentId, service, method, params } = hook.data

  return hook.service.find({
    query: {
      agentId,
      service,
      method
    }
  })
  .then((tokens) => {
    const filterMatchingParams = filter(paramsMatcher(params))
    tokens = filterMatchingParams(tokens)
    if (tokens.length === 0) return
    const token = tokens[tokens.length - 1]
    hook.result = token
  })
  .then(() => hook)
}

function getJwtOptions (app) {
  return {
    secret: app.get('authentication').secret,
    jwt: {
      audience: 'agent',
      subject: 'token'
    }
  }
}

function createJwt (hook) {
  const { app } = hook
  const { id: tokenId, jwt } = hook.result

  if (jwt != null) return hook

  const payload = { tokenId }
  const jwtOptions = getJwtOptions(app)
  return app.passport.createJWT(payload, jwtOptions)
    .then(jwt => {
      const patch = { jwt }
      return hook.service.patch(tokenId, patch)
    })
    .then(token => {
      hook.result = token
    })
    .then(() => hook)
}
