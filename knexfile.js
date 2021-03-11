// Update with your config settings.
// const pg = require('pg')
// pg.defaults.ssl = true

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/voice2vibes_development'
  },

  staging: {
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seed: {
      directory: __dirname + '/seeds'
    }
  }

}
