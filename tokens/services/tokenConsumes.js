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
      authenticate('jwt'),
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
  const {
    service: serviceName,
    method,
    params: tokenParams
  } = hook.params.token
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
      promise = service[method](id, params)
      break
    case 'create':
      promise = service[method](data, params)
      break
    case 'update':
    case 'patch':
      promise = service[method](id, data, params)
      break
  }
  return promise
    .then(result => {
      hook.result.result = result
    })
    .then(() => hook)
}
