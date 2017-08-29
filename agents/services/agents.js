const { iff } = require('feathers-hooks-common')
import { isNil } from 'ramda'

module.exports = function () {
  const app = this
  app.service('agents').hooks(hooks)
}

const hooks = {
  after: {
    create: [
      createCreateProfileTaskPlan,
      iff(hasNoGroupAgent, createGroupAgent)
    ]
  }
}

function createCreateProfileTaskPlan (hook) {
  if (hook.result.type === 'person') {
    return hook.app.service('taskPlans').create({
      assigneeId: hook.result.id,
      taskRecipeId: 'createProfile',
      params: {}
    })
    .then(() => {
      return hook.app.service('credentials').get(hook.result.id)
    })
    .then((cred) => {
      // TODO: IK: looks like the email isn't getting attached to the credential correctly, investigate dogstack-agents
      return hook.app.service('mailer').create({
        from: 'hello@cobuy.nz',
        to: cred.email || 'no@email.com',
        subject: 'Test Cobuy SignUp Email',
        html: 'test email'
      })
    })
    .then(() => hook)
  }
}

function createGroupAgent (hook) {
  // also create the relationship between the person and the group after this
  if (hook.result.type === 'person') {
    const agents = hook.app.service('agents')
    return agents.create({ type: 'group' })
    .then((agent) => {
      hook.data.agentId = agent.id
      return hook
    })
  }
}

function hasNoGroupAgent (hook) {
  return isNil(hook.data.agentId)
}
