var config = {
  port: process.env.PORT,
  app: {
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
  },
  assets: {
    url: process.env.ASSETS_URL
  },
  authentication: {
    secret: process.env.AUTHENTICATION_SECRET,
    remote: {
      google: {
        clientID: process.env.AUTHENTICATION_REMOTE_GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTHENTICATION_REMOTE_GOOGLE_CLIENT_SECRET
      },
      facebook: {
        clientID: process.env.AUTHENTICATION_REMOTE_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.AUTHENTICATION_REMOTE_FACEBOOK_CLIENT_SECRET
      },
      github: {
        clientID: process.env.AUTHENTICATION_REMOTE_GITHUB_CLIENT_ID,
        clientSecret: process.env.AUTHENTICATION_REMOTE_GITHUB_CLIENT_SECRET
      }
    }
  },
  mailer: process.env.MAILER
}

config.browser = {
  app: config.app,
  assets: config.assets
}

module.exports = config
