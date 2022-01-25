exports.up = function (knex) {
  return knex.schema.createTable("doctors", (table) => {
    table.increments().unique();
    table.integer("business_id");
    table.foreign("business_id").references("business_users.id");
    table.string("f_name");
    table.string("l_name");
    table.string("hkid");
    table.string("phone");
    table.string("email");
    table.string("gender");
    table.string("dob");
    table.string("room");
    table.timestamps(false, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("doctors");
};
