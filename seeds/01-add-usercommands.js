
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usercommands').del()
    .then(function () {
      // Inserts seed entries
      return knex('usercommands').insert([
        {id: 1, phrase: 'on', user_id: 1, command_id: 1},
        {id: 2, phrase: 'off', user_id: 1, command_id: 2}
      ]);
    });
};
