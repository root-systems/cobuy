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
  .then((token) => {
    return hook.app.service('mailer').create({
      from: 'hello@cobuy.nz',
      to: email || 'no@email.com',
      subject: `You're invited to join Cobuy!`,
      html: `
        Hi -name-. You've been invited by -admin- to join -group- on Cobuy! Click <a href=
        ${hook.app.get('url')}/invited/${token.jwt}>here</a> to set your password and start co-buying!
      `
    })
  })
  .then(() => hook)
}
