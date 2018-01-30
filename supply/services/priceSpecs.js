const feathersKnex = require('feathers-knex')
import errors from 'feathers-errors'
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { prop, merge, difference, without, contains, isEmpty } from 'ramda'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'priceSpecs'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

// TODO: IK: the CUPR methods should protect by user being a group admin for the related products related suppliers related group
const hooks = {
  before: {
    all: authenticate('jwt'),
    find: restrictToCurrentUserGroupsSuppliersProducts,
    get: restrictToCurrentUserGroupsSuppliersProducts,
    create: restrictToAnyGroupAdmin,
    update: restrictToAnyGroupAdmin,
    patch: restrictToAnyGroupAdmin,
    remove: restrictToAnyGroupAdmin
  },
  after: {},
  error: {}
}

function restrictToCurrentUserGroupsSuppliersProducts (hook) {
  // IK: NB. this is subtly different to the hook of the same name in resourceTypes service, could surely be refactored together
  // use $in syntax to restrict arrays of results to certain values
  // by adding conditions to the query params
  const { agentId } = hook.params.credential
  return hook.app.service('relationships').find({
    query: {
      targetId: agentId,
      relationshipType: 'member'
    }
  })
  .then((groups) => {
    const groupIds = groups.map(prop('sourceId'))
    return hook.app.service('relationships').find({
      query: {
        sourceId: {
          $in: groupIds
        },
        relationshipType: 'supplier'
      }
    })
  })
  .then((suppliers) => {
    const supplierIds = suppliers.map(prop('targetId'))
    return hook.app.service('products').find({
      query: {
        supplierAgentId: {
          $in: supplierIds
        }
      }
    })
  })
  .then((products) => {
    // TODO: IK: clean this mess up!
    const productIds = products.map(prop('id'))
    if (!hook.params.query) {
      hook.params.query = {
        productId: {
          $in: productIds
        }
      }
      return hook
    }
    if (!hook.params.query.productId) {
      hook.params.query = merge(hook.params.query, {
        productId: {
          $in: productIds
        }
      })
      return hook
    }
    // either a number, or an object with querying syntax
    if (typeof hook.params.query.productId === 'object') {
      if (hook.params.query.productId.$in) {
        const disallowedProducts = difference(hook.params.query.productId.$in, productIds)
        hook.params.query.productId.$in = without(disallowedProducts, hook.params.query.productId.$in)
        return hook
      }
      hook.params.query.productId = merge(hook.params.query.productId, { $in: productIds })
      return hook
    }
    if (!contains(hook.params.query.productId, productIds)) {
      hook.params.query.productId = -1 // TODO: IK: is there a better way to achieve this outcome?
      return hook
    }
    if (contains(hook.params.query.productId, productIds)) {
      return hook
    }
    throw new Error(`couldn't restrict ${hook.service} query correctly for method ${hook.method}`)
  })
}

function restrictToAnyGroupAdmin (hook) {
  // If it was an internal call then skip this hook
  if (!hook.params.provider) {
    return hook;
  }
  const { agentId } = hook.params.credential
  return hook.app.service('relationships').find({
    query: {
      targetId: agentId,
      relationshipType: 'admin'
    }
  })
  .then((relationships) => {
    if (isEmpty(relationships)) {
      throw new errors.Forbidden(`You must be an admin of a group to execute ${hook.method} on ${hook.service}.`)
    }
    return hook
  })
}
