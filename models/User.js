const { Model } = require('objection')
// const knex = require('knex')

// Model.knex(knex)

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        const UserCommand = require('./UserCommand')
        return {
            usercommands: {
                relation: Model.HasManyRelation,
                modelClass: UserCommand,
                join: {
                    from: 'users.id',
                    to: 'usercommands.user_id'
                }
            }
        }
    }


}

module.exports = User