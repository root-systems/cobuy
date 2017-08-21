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
          .then(() => hook)
        }
      }
    ]
  }
}
