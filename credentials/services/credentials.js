const { iff } = require('feathers-hooks-common')
import { isNil, all } from 'ramda'

module.exports = function () {
  const app = this
  app.service('credentials').hooks(hooks)
}

const hooks = {
  after: {
    create: [
      createTaskPlan // TODO: IK: we probably don't want this to happen after every credential create, if agents may have multiple credentials
    ]
  }
}

function createTaskPlan (hook) {
  const { agentId } = hook.result
  return hook.app.service('taskPlans').create({
    assigneeId: agentId,
    taskRecipeId: 'createProfile',
    params: {}
  })
  .then(() => hook)
}
