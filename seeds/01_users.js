
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'kat', password: 'pw'},
        {id: 2, username: 'sam', password: 'pw'},
        {id: 3, username: 'pat', password: 'pw'}
      ]);
    });
};
