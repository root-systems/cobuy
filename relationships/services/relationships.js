import { hooks as authHooks } from 'feathers-authentication'
const { authenticate } = authHooks

module.exports = function () {
  const app = this
  app.service('relationships').hooks(hooks)
}

const hooks = {
  before: {
    all: authenticate('jwt'),
  }
}
