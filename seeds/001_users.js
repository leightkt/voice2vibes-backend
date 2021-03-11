
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usercommands').del()
  .then(() => {
    return knex('users').del()
  })
    .then(function () {
  //     // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'kat', password: 'pw'},
      ]);
    });
};
