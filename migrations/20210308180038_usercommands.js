
exports.up = function(knex) {
    return knex.schema.createTable('usercommands', (table) => {
        table.increments('id')
        table.string('phrase')
        table.integer('user_id')
        table.foreign('user_id').references('users.id').onDelete('CASCADE')
        table.integer('command_id')
        table.foreign('command_id').references('commands.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usercommands')
};
