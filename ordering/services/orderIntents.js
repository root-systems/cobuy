const feathersKnex = require('feathers-knex')
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { restrictToOwner } from 'feathers-authentication-hooks'
import { prop, merge, difference, without, contains } from 'ramda'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'orderIntents'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {
    all: authenticate('jwt'),
    find: restrictToCurrentUsersGroups,
    get: restrictToCurrentUsersGroups,
    // create: restrictToOwner({ idField: 'id', ownerField: 'agentId' }), // TODO: IK: restrictToOwner doesn't work with create method, need a custom hook like restrictToOwnerExtended which wraps it and deals with creates
    update: restrictToOwner({ idField: 'id', ownerField: 'agentId' }),
    patch: restrictToOwner({ idField: 'id', ownerField: 'agentId' }),
    remove: restrictToOwner({ idField: 'id', ownerField: 'agentId' })
  }
}

function restrictToCurrentUsersGroups (hook) {
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
    return hook.app.service('orders').find({
      query: {
        consumerAgentId: {
          $in: groupIds
        }
      }
    })
  })
  .then((orders) => {
    // TODO: IK: clean this mess up!
    const orderIds = orders.map(prop('id'))
    // now restrict the original query to only intents with orderIds that are within orderIds
    // if the original query already specifies orders, then don't add additional orderIds, but only keep those that are within orderIds
    if (!hook.params.query) {
      hook.params.query = {
        orderId: {
          $in: orderIds
        }
      }
      return hook
    }
    if (!hook.params.query.orderId) {
      hook.params.query = merge(hook.params.query, {
        orderId: {
          $in: orderIds
        }
      })
      return hook
    }
    // either a number, or an object with querying syntax
    if (typeof hook.params.query.orderId === 'object') {
      if (hook.params.query.orderId.$in) {
        const disallowedOrders = difference(hook.params.query.orderId.$in, orderIds)
        hook.params.query.orderId.$in = without(disallowedOrders, hook.params.query.orderId.$in)
        return hook
      }
      hook.params.query.orderId = merge(hook.params.query.orderId, { $in: orderIds })
      return hook
    }
    if (!contains(hook.params.query.orderId, orderIds)) {
      hook.params.query.orderId = -1 // TODO: IK: is there a better way to achieve this outcome?
      return hook
    }
    if (contains(hook.params.query.orderId, orderIds)) {
      return hook
    }
    throw new Error(`couldn't restrict orderIntents query correctly for method ${hook.method}`)
  })
}
