// this is a similar hook conceptually to restrictToOwner from feathers-authentication-hooks, but also works for the create hook which restrictToOwner doesn't support
// see https://github.com/feathersjs-ecosystem/feathers-authentication-hooks/blob/master/src/restrict-to-owner.js

import { restrictToOwner } from 'feathers-authentication-hooks'
import { prop, merge, difference, without, contains } from 'ramda'

const defaults = {
  idField: '_id',
  ownerField: 'userId'
}

export default function restrictToCurrentAgentOrGroupAdmin (hook) {
  if (hook.type !== 'before') {
    throw new Error(`The 'restrictToCurrentAgentOrGroupAdmin' hook should only be used as a 'before' hook.`);
  }

  // If it was an internal call then skip this hook
  if (!hook.params.provider) {
    return hook;
  }

  options = Object.assign({}, defaults, hook.app.get('authentication'), options)

  const { agentId } = hook.params.credential
  return hook.app.service('relationships').find({
    query: {
      targetId: agentId,
      relationshipType: 'member'
    }
  })
  .then((groups) => {
    // TODO: IK: clean this mess up!
    // TODO: IK: do we consistently use the 'consumerAgentId' term for groups throughout the app?
    const groupIds = groups.map(prop('sourceId'))
    if (!hook.params.query) {
      hook.params.query = {
        consumerAgentId: {
          $in: groupIds
        }
      }
      return hook
    }
    if (!hook.params.query.consumerAgentId) {
      hook.params.query = merge(hook.params.query, {
        consumerAgentId: {
          $in: groupIds
        }
      })
      return hook
    }
    // either a number, or an object with querying syntax
    if (typeof hook.params.query.consumerAgentId === 'object') {
      if (hook.params.query.consumerAgentId.$in) {
        const disallowedGroups = difference(hook.params.query.consumerAgentId.$in, groupIds)
        hook.params.query.consumerAgentId.$in = without(disallowedGroups, hook.params.query.consumerAgentId.$in)
        return hook
      }
      hook.params.query.consumerAgentId = merge(hook.params.query.consumerAgentId, { $in: groupIds })
      return hook
    }
    if (!contains(hook.params.query.consumerAgentId, groupIds)) {
      hook.params.query.consumerAgentId = -1 // TODO: IK: is there a better way to achieve this outcome?
      return hook
    }
    if (contains(hook.params.query.consumerAgentId, groupIds)) {
      return hook
    }
    throw new Error(`couldn't restrict ${hook.service} query correctly for method ${hook.method}`)
  })
}
