const hasher = require('feathers-authentication-local/lib/utils/hash')

exports.seed = function (knex, Promise) {
  // early return to test app without dummy data
  return
  // insert person agent
  return
  const devPersonAgent = {}
  return knex('agents').insert(devPersonAgent).returning('id')
  .then(([agentId]) => {
    // insert person profile
    const devPersonProfile = {
      agentId,
      name: 'Alice',
      description: 'Hey, This is only a test.',
      avatar: 'https://i.imgur.com/9p2dC14.gif' // source: https://imgur.com/gallery/OlVVE
    }
    return Promise.all([
      Promise.resolve(agentId),
      knex('profiles').insert(devPersonProfile)
    ])
  })
  .then(([agentId]) => {
    // insert person credential
    const devPersonCredential = {
      agentId,
      email: 'test@test.nz',
      password: 'password'
    }
    return hashCredential(devPersonCredential)
  }).then(credential => {
    return knex('credentials').insert(credential)
  })
}

function hashCredential (credential) {
  return hasher(credential.password)
    .then(hashedPassword => {
      return Object.assign(credential, { password: hashedPassword })
    })
}
