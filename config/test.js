module.exports = {
  authentication: {
    secret: 'TEST',
    remote: {
      google: {
        clientID: 'TEST',
        clientSecret: 'TEST'
      },
      facebook: {
        clientID: 'TEST',
        clientSecret: 'TEST'
      },
      github: {
        clientID: 'TEST',
        clientSecret: 'TEST'
      }
    }
  },
  mailer: {
    port: 1025,
    ignoreTLS: true
  }
}
