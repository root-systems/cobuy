const feathersMailer = require('feathers-mailer')
import { disallow, isProvider, iff } from 'feathers-hooks-common'

module.exports = function () {
  const app = this

  const name = 'mailer'
  const config = app.get(name)

  app.use(name, feathersMailer(config))
  app.service(name).hooks(hooks)
}

const hooks = {
  before: {
    find: disallow(),
    get: disallow(),
    create: iff(isProvider('external'), disallow()),
    update: disallow(),
    patch: disallow(),
    remove: disallow()
  }
}
