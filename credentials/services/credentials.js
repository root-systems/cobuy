const { iff } = require('feathers-hooks-common')
import { isNil, all } from 'ramda'
import welcomeMjml from '../../app/mjml/welcome'

module.exports = function () {
  const app = this
  app.service('credentials').hooks(hooks)
}

const hooks = {
  after: {
    create: [
      createTaskPlan,
      iff(hasNoAuthorization, createPatchCredentialsTokenAndInviteMail)
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

function hasNoAuthorization (hook) {
  const { password } = hook.data
  const { googleId, facebookId, githubId, twitterId } = hook.result
  return all(isNil)([password, googleId, facebookId, githubId, twitterId])
}

function createPatchCredentialsTokenAndInviteMail (hook) {
  const appConfig = hook.app.get('app')
  const { id, agentId, email } = hook.result

  // TODO: IK: get the agent name, admin name, group name
  return hook.app.service('tokens').create({
    agentId,
    service: 'credentials',
    method: 'patch',
    params: { serviceId: id }
  })
  // TODO: add .env variables to change from 'Tapin' in copy
  .then((token) => {
    const appConfig = hook.app.get('app')
    const assetsUrl = hook.app.get('assets').url
    const mjmlOutput = welcomeMjml({
      app: appConfig,
      assetsUrl,
      token
    })
    if (mjmlOutput.errors) {
      // uhhhhh...?
      mjmlOutput.errors.forEach(console.error)
    }
    return hook.app.service('mailer').create({
      from: `${appConfig.email}`,
      to: email || 'no@email.com',
      subject: `You're invited to join ${appConfig.name}!`,
      html: mjmlOutput.html
    })
  })
  .then(() => hook)
}
