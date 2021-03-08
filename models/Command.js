const { Model } = require('objection')
const User = require('./User')

class Command extends Model {
    static get tableName() {
        return 'commands'
    }

    static get relationMappings() {
        const UserCommand = require('./UserCommand')
        return {
            usercommands: {
                relation: Model.HasManyRelation,
                modelClass: UserCommand,
                join: {
                    from: 'commands.id',
                    to: 'usercommands.command_id'
                }
            }
        }
    }
}

module.exports = Command