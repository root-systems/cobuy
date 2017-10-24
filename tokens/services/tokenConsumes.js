import feathersKnex from 'feathers-knex'
import { disallow, validateSchema } from 'feathers-hooks-common'
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import tokenConsumeSchema from '../schemas/tokenConsume'
import { merge } from 'ramda'

import ajv from '../../app/schemas'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'tokenConsumes'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {
    find: disallow(),
    get: disallow(),
    create: [
      decodeJwt,  // TODO: IK: not sure this should come before validation, means the model isn't really truthful... better to pass in jwt and validate against that?
      validateSchema(tokenConsumeSchema, ajv),
      loadToken,
      getPayload
    ],
    update: disallow(),
    patch: disallow(),
    remove: disallow()
  },
  after: {
    all: [
    ],
    create: [
      callServiceMethod
    ]
  },
  error: {}
}

function decodeJwt (hook) {
  const { jwt } = hook.data
  const secret = hook.app.get('authentication').secret
  return hook.app.passport.verifyJWT(jwt, { secret })
  .then((token) => {
    hook.data.tokenId = token.tokenId
    delete hook.data.jwt
  })
  .then(() => hook)
  // feathers-errors for bad JWT's?
  // TODO: a test for bad JWT's
}

function loadToken (hook) {
  const tokensService = hook.app.service('tokens')
  const { tokenId } = hook.data
  return tokensService.get(tokenId)
    .then(token => {
      hook.params.token = token
    })
    .then(() => hook)
}

function getPayload (hook) {
  if (hook.data.payload) {
    hook.params.payload = hook.data.payload
    delete hook.data.payload
  }
  return hook
}

function callServiceMethod (hook) {
  // TODO: IK: probably a better way to do this than serviceId, a permanent column in the token table?
  // we might want the serviceId to be determined at token.create time, or at tokenConsumes.create time
  // i.e. a token that can be used for any id, vs a token for a specific id
  const {
    service: serviceName,
    method,
    agentId,
    params: tokenParams
  } = hook.params.token
  const serviceId = hook.params.token.params.serviceId || null
  const service = hook.app.service(serviceName)
  const {
    id,
    data,
    params: consumeParams
  } = hook.params.payload
  const params = merge(tokenParams, consumeParams)
  var promise
  switch (method) {
    case 'find':
      promise = service[method](params)
      break
    case 'get':
    case 'remove':
      promise = service[method](serviceId, params)
      break
    case 'create':
      promise = service[method](data, params)
      break
    case 'update':
    case 'patch':
      promise = service[method](serviceId, data, params)
      break
  }
  return promise
    .then(result => {
      hook.result.result = result
    })
    .then(() => hook)
}
