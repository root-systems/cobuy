import errors from 'feathers-errors'
import { isEmpty } from 'ramda'

export default function restrictToGroupAdmin (hook) {
  // If it was an internal call then skip this hook
  if (!hook.params.provider) {
    return hook;
  }
  const { agentId } = hook.params.credential
  const { consumerAgentId } = hook.data
  return hook.app.service('relationships').find({
    query: {
      sourceId: consumerAgentId,
      targetId: agentId,
      relationshipType: 'admin'
    }
  })
  .then((relationships) => {
    if (isEmpty(relationships)) {
      throw new errors.Forbidden(`You must be an admin of group ${consumerAgentId} to execute ${hook.method} on ${hook.service}.`)
    }
    return hook
  })
}
