const knex = require('knex')
const database = require('./database/Database')
const { Model } = require('objection')
Model.knex(database)
const User = require('./models/User')
const UserCommand = require('./models/UserCommand')

module.exports = { 
    allUsers() {
        return User.query()
    },

    showUser(id) {
        return User.query()
                .where('id', id)
                .withGraphFetched('usercommands')
    },

    createUser(user) {
        const newUser = User.query().insert({
            username: user.username,
            password: user.password
        })
        return newUser
    },

    createNewUserCommands(id) {
        for(let i = 1; i < 15; i++) {
            UserCommand.query().insert({
                user_id: id,
                command_id: i,
                phrase: ""
            })
            .then(response => console.log(response))
        }
        
        return User.query().findById(id)
            .withGraphFetched('usercommands')
    },

    deleteUser(id) {
        const userDeleted = User.query().deleteById(id)
        return userDeleted
    }




}