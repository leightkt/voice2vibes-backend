const config = require('../knexfile')[process.env.NODE_ENV || 'development']
// const config = require('../knexfile').development
const pg = require('pg')
pg.defaults.ssl = true
const knex = require('knex')
const database = knex(config)

module.exports = database