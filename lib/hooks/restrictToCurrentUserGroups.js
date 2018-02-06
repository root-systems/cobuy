import { prop, merge, difference, without, contains } from 'ramda'

export default function restrictToCurrentUserGroups (hook) {
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
