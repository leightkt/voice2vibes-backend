const config = require('../knexfile').development
const knex = require('knex')
const database = knex(config)

module.exports = database