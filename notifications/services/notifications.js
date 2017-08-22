const feathersMailer = require('feathers-mailer')
const nodemailer = require('nodemailer')

// TODO: some flag for dev vs prod, prod we probably want Mandrill transport or something similar
const mailerConfig = require(`../../config/${process.env.NODE_ENV}`).mailer
const dummyTransport = nodemailer.createTransport(mailerConfig)

module.exports = function () {
  const app = this
  const db = app.get('db')

  const name = 'notifications'

  app.use(name, feathersMailer(dummyTransport))
}
