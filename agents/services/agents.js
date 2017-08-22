module.exports = function () {
  const app = this
  app.service('agents').hooks(hooks)
}

const hooks = {
  after: {
    create: [
      (hook) => {
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
    ]
  }
}
