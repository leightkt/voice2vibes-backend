const { Model } = require('objection')

class UserCommand extends Model {
    static get tableName() {
        return 'usercommands'
    }

    static get relationMappings() {
        const User = require('./User')
        const Command = require('./Command')

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'usercommands.user_id',
                    to: 'users.id'
                }
            },
            command: {
                relation: Model.BelongsToOneRelation,
                modelClass: Command,
                join: {
                    from: 'usercommands.command_id',
                    to: 'commands.id'
                }
            }
        }
    }
}

module.exports = UserCommand