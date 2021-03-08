const knex = require('knex')
const database = require('./database/Database')

module.exports = { 
    listAll(){
        return database('users')
    }
}