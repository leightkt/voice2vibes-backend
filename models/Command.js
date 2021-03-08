const { Model } = require('objection')

class Command extends Model {
    static tableName = 'commands'
}

module.exports = Command