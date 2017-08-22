const feathersMailer = require('feathers-mailer')
const nodemailer = require('nodemailer')

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'mailer'
  const config = app.get(name)

  app.use(name, feathersMailer(config))
}
