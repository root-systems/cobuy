import errors from 'feathers-errors'
import { isEmpty } from 'ramda'

export default function restrictToAnyGroupAdmin (hook) {
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
