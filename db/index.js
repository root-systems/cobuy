var { join } = require('path')
// Update with your config settings.

module.exports = {
  migrations: {
    directory: join(__dirname, 'migrations')
  },
  seeds: {
    directory: join(__dirname, 'seeds')
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'dev.sqlite')
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  }
}
