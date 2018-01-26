const feathersKnex = require('feathers-knex')
import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks
import { restrictToOwner } from 'feathers-authentication-hooks'
import { disallow, isProvider, iff } from 'feathers-hooks-common'

import restrictToCurrentUserGroups from '../../lib/hooks/restrictToCurrentUserGroups'

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'orderPlans'
  const options = { Model: db, name }

  app.use(name, feathersKnex(options))
  app.service(name).hooks(hooks)
}

// TODO: IK: consider what update, patch, remove should be... how will plans be altered once made
const hooks = {
  before: {
    all: authenticate('jwt'),
    find: restrictToCurrentUserGroups,
    get: restrictToCurrentUserGroups,
    create: iff(isProvider('external'), disallow()),
    update: restrictToOwner({ idField: 'id', ownerField: 'agentId' }),
    patch: restrictToOwner({ idField: 'id', ownerField: 'agentId' }),
    remove: restrictToOwner({ idField: 'id', ownerField: 'agentId' })
  }
}
