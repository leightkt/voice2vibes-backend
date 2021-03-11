// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/voice2vibes_development'
  },

  staging: {
  },

  production: {
    type: "postgres",
    host: "ec2-3-222-11-129.compute-1.amazonaws.com",
    port: "5432",
    username: "nlkzimsxtnwodh",
    password: "ab1453c651956f86341cfc13e8fc25d61894de57675c0ac4da4ca9a431ce1021",
    database: "dbjfv6jdkmfiqs",
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      }
    },
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seed: {
      directory: __dirname + '/seeds'
    }
  }

};
