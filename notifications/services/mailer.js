const feathersMailer = require('feathers-mailer')

module.exports = function () {
  const app = this

  const name = 'mailer'
  const config = app.get(name)

  app.use(name, feathersMailer(config))
}
