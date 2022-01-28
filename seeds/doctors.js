exports.seed = function(knex) {
  return knex('doctors').del()
    .then(function () {
      return knex('doctors').insert([
        {business_id: 7, f_name: 'One', l_name: 'Tester', hkid: 'testing1', phone: 'testing1', email: 'test1@test1.com', gender: 'test', dob: 'testborn1', room: 'test1'},
        {business_id: 7, f_name: 'Two', l_name: 'Tasting', hkid: 'yummy2', phone: 'yummy', email: 'yum@yum.com', gender: 'yum', dob: 'yum2', room: 'yum2'},
        {business_id: 8, f_name: 'One', l_name: 'Tester', hkid: 'testing1', phone: 'testing1', email: 'test1@test1.com', gender: 'test', dob: 'testborn1', room: 'test1'},
      ]);
    });
};
