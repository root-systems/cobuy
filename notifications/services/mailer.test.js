import test from 'ava'
import feathers from 'feathers'
import feathersHooks from 'feathers-hooks'
import createDb from 'dogstack/createDb'
import feathersConfig from 'feathers-configuration'
import feathersMailer from 'feathers-mailer'
import { isEmpty } from 'ramda'
import Maildev from 'maildev'

import Mailer from './mailer'

import dbConfig from '../../db'

process.env.NODE_ENV = 'test'

var app
test.before(() => {
  app = feathers()
    .configure(feathersConfig())
    .configure(feathersHooks())

  const db = createDb(dbConfig)
  app.set('db', db)

  app.configure(Mailer)

  const mailserver = new Maildev()
  mailserver.listen()

  return db.migrate.latest(dbConfig.migrations)
})

test.serial('Mailer: create new mail successfully', t => {
  return app.service('mailer').create({
    from: 'test@cobuy.nz',
    to: 'user@test.nz',
    subject: 'mail test',
    html: 'This is the email body'
  })
  .then(mail => {
    t.is(mail.response.slice(0, 3), '250')
  })
})

test.serial("Mailer: can't create new mail if external provider", t => {
  const params = { provider: 'rest' }
  return t.throws(app.service('mailer').create({
    from: 'test@cobuy.nz',
    to: 'user@test.nz',
    subject: 'mail test',
    html: 'This is the email body'
  }, params))
})
