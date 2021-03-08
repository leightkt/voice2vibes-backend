
exports.up = function(knex) {
    return knex.schema.createTable('commands', (table) => {
        table.increments('id')
        table.string('name')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('commands')
};
