// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/voice2vibes_development'
  },

  staging: {
  },

  production: {
    host: "ec2-3-222-11-129.compute-1.amazonaws.com",
    database: "dbjfv6jdkmfiqs",
    user: "nlkzimsxtnwodh",
    port: "5432",
    password: "ab1453c651956f86341cfc13e8fc25d61894de57675c0ac4da4ca9a431ce1021",
    dialect: 'postgres',
    use_env_variable: DATABASE_URL
  }

};
