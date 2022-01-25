exports.seed = function(knex) {
  return knex('business_users').del()
    .then(function () {
      return knex('business_users').insert([
        {name: 'QHS', email: 'qhs@qhs.com', password: 'qhs', secret_token: 'secret1'},
        {name: 'ABC', email: 'abc@abc.com', password: 'abc', secret_token: 'another1'},
      ]);
    });
};
