exports.seed = function(knex) {
  return knex('business_users').del()
    .then(function () {
      return knex('business_users').insert([
        {name: 'QHS', email: 'qhs@qhs.com', password: '$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW', secret_token: 'secret1'},
        {name: 'ABC', email: 'abc@abc.com', password: '$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW', secret_token: 'another1'},
      ]);
    });
};
