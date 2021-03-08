
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('commands').del()
    .then(function () {
      // Inserts seed entries
      return knex('commands').insert([
        {id: 1, name: 'on'},
        {id: 2, name: 'off'},
        {id: 3, name: 'vibrate'},
        {id: 4, name: 'pulse'},
        {id: 5, name: 'wave'},
        {id: 6, name: 'cha cha'},
        {id: 7, name: 'tease'},
        {id: 8, name: 'tempo'},
        {id: 9, name: 'step'},
        {id: 10, name: 'massage'},
        {id: 11, name: 'ramp'},
        {id: 12, name: 'low'},
        {id: 13, name: 'medium'},
        {id: 14, name: 'high'}
      ]);
    });
};
