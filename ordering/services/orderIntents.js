const feathersKnex = require('feathers-knex')
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { restrictToOwner } from 'feathers-authentication-hooks'

import restrictToCurrentUserGroupsOrders from '../../lib/hooks/restrictToCurrentUserGroupsOrders'

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
    find: restrictToCurrentUserGroupsOrders,
    get: restrictToCurrentUserGroupsOrders,
    // create: restrictToOwner({ idField: 'id', ownerField: 'agentId' }), // TODO: IK: restrictToOwner doesn't work with create method, need a custom hook like restrictToOwnerExtended which wraps it and deals with creates
    update: restrictToOwner({ idField: 'id', ownerField: 'agentId' }),
    patch: restrictToOwner({ idField: 'id', ownerField: 'agentId' }),
    remove: restrictToOwner({ idField: 'id', ownerField: 'agentId' })
  }
}
