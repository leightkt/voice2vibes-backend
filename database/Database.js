const config = require('../knexfile')[process.env.NODE_ENV || 'development']
config.ssl = { rejectUnauthorized: false }
// const config = require('../knexfile').development
const knex = require('knex')
const database = knex(config)

module.exports = database