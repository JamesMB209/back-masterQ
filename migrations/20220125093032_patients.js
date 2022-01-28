exports.up = function (knex) {
  return knex.schema.createTable("patients", (table) => {
    table.increments().unique();
    table.string("f_name");
    table.string("l_name");
    table.string("hkid").unique();
    table.string("email").unique();
    table.string("password");
    table.string("gender");
    table.string("dob");
    table.string("phone");
    table.string("drug_allergy");
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("patients");
};