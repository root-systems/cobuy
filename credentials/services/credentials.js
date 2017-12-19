const { iff } = require('feathers-hooks-common')
import { isNil, all } from 'ramda'

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
  const { id, agentId, email } = hook.result
  return hook.app.service('tokens').create({
    agentId,
    service: 'credentials',
    method: 'patch',
    params: { serviceId: id }
  })
  // TODO: add .env variables to change from 'Tapin' in copy
  .then((token) => {
    return hook.app.service('mailer').create({
      from: 'hello@cobuy.nz',
      to: email || 'no@email.com',
      subject: `You're invited to join TapinBuy!`,
      html: `
        Hi. You've been invited to join a group on TapinBuy! 

        TapinBuy is an easy way for schools and ECE providers to make group purchases so they can take
advantage of price points through economies of scale.

        Click <a href=${hook.app.get('app').url}/invited/${token.jwt}>here</a> to set your password and start buying together!
      `
    })
  })
  .then(() => hook)
}
