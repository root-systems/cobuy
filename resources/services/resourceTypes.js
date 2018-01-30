const feathersKnex = require('feathers-knex')
import errors from 'feathers-errors'
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { prop, merge, difference, without, contains, isEmpty } from 'ramda'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'resourceTypes'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

// TODO: IK: not clear to me what the ideal protection is for CUPR... when a resource is created it doesn't necessarily need an existing product, so at the moment it's just restricted to any group admins (not ideal)
const hooks = {
  before: {
    // all: authenticate('jwt'),
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
    const resourceTypeIds = products.map(prop('resourceTypeId'))
    if (!hook.params.query) {
      hook.params.query = {
        id: {
          $in: resourceTypeIds
        }
      }
      return hook
    }
    if (!hook.params.query.id) {
      hook.params.query = merge(hook.params.query, {
        id: {
          $in: resourceTypeIds
        }
      })
      return hook
    }
    // either a number, or an object with querying syntax
    if (typeof hook.params.query.id === 'object') {
      if (hook.params.query.id.$in) {
        const disallowedResourceTypes = difference(hook.params.query.id.$in, resourceTypeIds)
        hook.params.query.id.$in = without(disallowedResourceTypes, hook.params.query.id.$in)
        return hook
      }
      hook.params.query.id = merge(hook.params.query.id, { $in: resourceTypeIds })
      return hook
    }
    if (!contains(hook.params.query.id, resourceTypeIds)) {
      hook.params.query.id = -1 // TODO: IK: is there a better way to achieve this outcome?
      return hook
    }
    if (contains(hook.params.query.id, resourceTypeIds)) {
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
