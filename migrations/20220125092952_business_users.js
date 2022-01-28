exports.up = function (knex) {
  return knex.schema.createTable("business_users", (table) => {
    table.increments().unique();
    table.string("name");
    table.string("email").unique();
    table.string("password");
    table.string("secret_token");
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("business_users");
};
