module.exports = function () {
  const app = this
  app.service('agents').hooks(hooks)
}

const hooks = {
  after: {
    create: [
      (hook) => {
        if (hook.result.type === 'person') {
          const agentId = hook.result.id
          var agentEmail

          return hook.app.service('taskPlans').create({
            assigneeId: agentId,
            taskRecipeId: 'createProfile',
            params: {}
          })
          .then(() => {
            return hook.app.service('credentials').find({ query: { agentId } })
          })
          .then(([cred]) => {
            agentEmail = cred.email
            return hook.app.service('tokens').create({
              agentId,
              service: 'credentials',
              method: 'patch',
              params: { serviceId: cred.id },
              createdAt: new Date().toString()
            })
          })
          .then((token) => {
            // TODO: IK: looks like the email isn't getting attached to the credential correctly, investigate dogstack-agents
            return hook.app.service('mailer').create({
              from: 'hello@cobuy.nz',
              to: agentEmail || 'no@email.com',
              subject: `You're invited to join Cobuy!`,
              html: `
                Hi -name-. You've been invited by -admin- to join -group- on Cobuy! Click <a href=
                ${hook.app.get('url')}/invited/${token.jwt}>here</a> to set your password and start co-buying!
              `
            })
          })
          .then(() => hook)
        }
      }
    ]
  }
}
