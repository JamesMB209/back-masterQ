exports.seed = function (knex) {
  return knex('patients').del()
    .then(function () {
      return knex('patients').insert([
        { f_name: 'Soledad', l_name: 'Navarro', hkid: 'A1234567', email: 'soledad@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1970-04-07T01:22:44.604Z', phone: 'A1234567', drug_allergy: 'Carbs' },
        { f_name: 'Tânia', l_name: 'Duarte', hkid: 'B1234567', email: 'tania@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1971-04-07T01:22:44.604Z', phone: 'B1234567', drug_allergy: 'Egg' },
        { f_name: 'Sofia', l_name: 'Ruiz', hkid: 'C1234567', email: 'sofia@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1972-04-07T01:22:44.604Z', phone: 'C1234567', drug_allergy: 'Fish' },
        { f_name: 'Noélia', l_name: 'Luz', hkid: 'D1234567', email: 'noélia@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1973-04-07T01:22:44.604Z', phone: 'D1234567', drug_allergy: 'Noélia' },
        { f_name: 'Aiden', l_name: 'Wilson', hkid: 'E1234567', email: 'aiden@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1974-04-07T01:22:44.604Z', phone: 'E1234567', drug_allergy: 'Aiden' },
        { f_name: 'Ceyhan', l_name: 'Mertoğlu', hkid: 'F1234567', email: 'ceyhan@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1975-04-07T01:22:44.604Z', phone: 'F1234567', drug_allergy: 'Ceyhan' },
        { f_name: 'Frida', l_name: 'Christiansen', hkid: 'G1234567', email: 'frida@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1976-04-07T01:22:44.604Z', phone: 'G1234567', drug_allergy: 'Frida' },
        { f_name: 'Klemens', l_name: 'Heinemann', hkid: 'H1234567', email: 'klemens@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1977-04-07T01:22:44.604Z', phone: 'H1234567', drug_allergy: 'Klemens' },
        { f_name: 'Clarence', l_name: 'Harvey', hkid: 'I1234567', email: 'clarence@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1978-04-07T01:22:44.604Z', phone: 'I1234567', drug_allergy: 'Clarence' },
        { f_name: 'Gigi', l_name: 'Verhulst', hkid: 'J1234567', email: 'gigi@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1979-04-07T01:22:44.604Z', phone: 'J1234567', drug_allergy: 'Gigi' },
        { f_name: 'Milo', l_name: 'Leroy', hkid: 'K1234567', email: 'milo@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1980-04-07T01:22:44.604Z', phone: 'K1234567', drug_allergy: 'milo' },
        { f_name: 'Kimberly', l_name: 'Medina', hkid: 'L1234567', email: 'kimberly@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1981-04-07T01:22:44.604Z', phone: 'L1234567', drug_allergy: 'kimberly' },
        { f_name: 'Filippa', l_name: 'Christiansen', hkid: 'M1234567', email: 'filippa@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1982-04-07T01:22:44.604Z', phone: 'M1234567', drug_allergy: 'filippa' },
        { f_name: 'Jeppe', l_name: 'Petersen', hkid: 'N1234567', email: 'jeppe@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1983-04-07T01:22:44.604Z', phone: 'N1234567', drug_allergy: 'jeppe' },
        { f_name: 'Bieke', l_name: 'Schneiders', hkid: 'O1234567', email: 'bieke@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1984-04-07T01:22:44.604Z', phone: 'O1234567', drug_allergy: 'bieke' },
        { f_name: 'Ahmet', l_name: 'Arslanoğlu', hkid: 'P1234567', email: 'ahmet@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1985-04-07T01:22:44.604Z', phone: 'P1234567', drug_allergy: 'ahmet' },
        { f_name: 'Adrien', l_name: 'Martinez', hkid: 'Q1234567', email: 'adrien@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1986-04-07T01:22:44.604Z', phone: 'Q1234567', drug_allergy: 'adrien' },
        { f_name: 'Gonca', l_name: 'Taşçi', hkid: 'R1234567', email: 'gonca@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'male', dob: '1987-04-07T01:22:44.604Z', phone: 'R1234567', drug_allergy: 'gonca' },
        { f_name: 'Jean', l_name: 'Menard', hkid: 'S1234567', email: 'jean@example.com', password: "$2b$10$gvkfuIwV2hRFCdXRqwfQ.eHzbp7jo.0JvICMwNH.XY97GeE5sugAW", gender: 'female', dob: '1988-04-07T01:22:44.604Z', phone: 'S1234567', drug_allergy: 'jean' },
      ]);
    });
};
