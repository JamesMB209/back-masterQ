exports.seed = function (knex) {
  return knex("doctors")
    .del()
    .then(function () {
      return knex("doctors").insert([
        {
          business_id: 1,
          f_name: "Peram",
          l_name: "Kharel",
          hkid: "1234567890",
          phone: "852999",
          email: "peram.kharel@example.com",
          gender: "male",
          dob: "1970-04-07T01:22:44.604Z",
          room: "1001",
        },
        {
          business_id: 1,
          f_name: "Pris",
          l_name: "Cheng",
          hkid: "0987654321",
          phone: "999852",
          email: "@example.com",
          gender: "female",
          dob: "1945-10-28T02:27:17.989Z",
          room: "1002",
        },
        {
          business_id: 1,
          f_name: "James",
          l_name: "Betts",
          hkid: "0147852369",
          phone: "987123",
          email: "@example.com",
          gender: "male",
          dob: "1998-04-09T11:08:32.462Z",
          room: "1003",
        },
        {
          business_id: 2,
          f_name: "Felix",
          l_name: "Andersen",
          hkid: "2514",
          phone: "17738731",
          email: "felix.andersen@example.com",
          gender: "male",
          dob: "1965-11-05T19:53:11.645Z",
          room: "2001",
        },
        {
          business_id: 2,
          f_name: "Tamara",
          l_name: "Holmes",
          hkid: "2504",
          phone: "0360787838",
          email: "tamara.holmes@example.com",
          gender: "female",
          dob: "1963-02-01T16:51:56.339Z",
          room: "2002",
        },
        {
          business_id: 2,
          f_name: "Adelbert",
          l_name: "Lee",
          hkid: "8911",
          phone: "099-86175788",
          email: "adelbert.lee@example.com",
          gender: "female",
          dob: "1975-10-24T00:24:43.433Z",
          room: "2003",
        },
        {
          business_id: 3,
          f_name: "Jessica",
          l_name: "Lee",
          hkid: "4232",
          phone: "1975778027",
          email: "jessica.lee@example.com",
          gender: "female",
          dob: "1981-12-31T15:39:36.528Z",
          room: "3001",
        },
        {
          business_id: 3,
          f_name: "Billy",
          l_name: "Edwards",
          hkid: "6302",
          phone: "036261755",
          email: "billy.edwards@example.com",
          gender: "male",
          dob: "1947-07-29T17:12:16.863Z",
          room: "3002",
        },
        {
          business_id: 4,
          f_name: "Marlise",
          l_name: "Philippe",
          hkid: "7001",
          phone: "0793689622",
          email: "marlise.philippe@example.com",
          gender: "female",
          dob: "1953-07-15T06:39:11.329Z",
          room: "4001",
        },
        {
          business_id: 4,
          f_name: "Matthieu",
          l_name: "Garnier",
          hkid: "3341",
          phone: "0798676802",
          email: "matthieu.garnier@example.com",
          gender: "male",
          dob: "1955-10-14T10:30:50.802Z",
          room: "4002",
        },
      ]);
    });
};
