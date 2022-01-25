exports.seed = function(knex) {
  return knex('patients').del()
    .then(function () {
      return knex('patients').insert([
        {f_name: 'OneFirst', l_name: 'OneLast', hkid: 'OneTest1', email: 'one@one.com', gender: 'Onerr', dob: 'OneBorn', phone: 'OneNumber', drug_allergy: 'OneAllergy'},
        {f_name: 'TwoFirst', l_name: 'TwoLast', hkid: 'TwoTest2', email: 'two@two.com', gender: 'Tworr', dob: 'TwoBorn', phone: 'TwoNumber', drug_allergy: 'TwoAllergy'},
      ]);
    });
};
