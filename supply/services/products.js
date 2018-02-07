const feathersKnex = require('feathers-knex')
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { prop, merge, difference, without, contains, pipe, path, isNil } from 'ramda'
const { iff } = require('feathers-hooks-common')

import restrictToAnyGroupAdmin from '../../lib/hooks/restrictToAnyGroupAdmin'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'products'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hasNoResourceType = pipe(
  path(['data', 'resourceTypeId']),
  isNil
)

const hooks = {
  before: {
    all: authenticate('jwt'),
    find: restrictToCurrentUserGroupsSuppliers,
    get: restrictToCurrentUserGroupsSuppliers,
    create: [
      restrictToAnyGroupAdmin,
      iff(hasNoResourceType,
        createResourceType
      )
    ],
    update: restrictToAnyGroupAdmin,
    patch: restrictToAnyGroupAdmin,
    remove: restrictToAnyGroupAdmin
  },
  after: {},
  error: {}
}

function createResourceType (hook) {
  const resourceTypesService = hook.app.service('resourceTypes')
  return resourceTypesService.create({})
    .then(resourceType => {
      hook.data.resourceTypeId = resourceType.id
    })
    .then(() => hook)
}

function restrictToCurrentUserGroupsSuppliers (hook) {
  // IK: NB. this is subtly different to hooks of similar names in resourceTypes / priceSpecs service, could surely be refactored together
  // use $in syntax to restrict arrays of results to certain values
  // by adding conditions to the query params
  // If it was an internal call then skip this hook
  if (!hook.params.provider) {
    return hook;
  }
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
    const supplierAgentIds = suppliers.map(prop('targetId'))
    // TODO: IK: clean this mess up!
    if (!hook.params.query) {
      hook.params.query = {
        supplierAgentId: {
          $in: supplierAgentIds
        }
      }
      return hook
    }
    if (!hook.params.query.supplierAgentId) {
      hook.params.query = merge(hook.params.query, {
        supplierAgentId: {
          $in: supplierAgentIds
        }
      })
      return hook
    }
    // either a number, or an object with querying syntax
    if (typeof hook.params.query.supplierAgentId === 'object') {
      if (hook.params.query.supplierAgentId.$in) {
        const disallowedProducts = difference(hook.params.query.supplierAgentId.$in, supplierAgentIds)
        hook.params.query.supplierAgentId.$in = without(disallowedProducts, hook.params.query.supplierAgentId.$in)
        return hook
      }
      hook.params.query.supplierAgentId = merge(hook.params.query.supplierAgentId, { $in: supplierAgentIds })
      return hook
    }
    if (!contains(hook.params.query.supplierAgentId, supplierAgentIds)) {
      hook.params.query.supplierAgentId = -1 // TODO: IK: is there a better way to achieve this outcome?
      return hook
    }
    if (contains(hook.params.query.supplierAgentId, supplierAgentIds)) {
      return hook
    }
    throw new Error(`couldn't restrict ${hook.service} query correctly for method ${hook.method}`)
  })
}
