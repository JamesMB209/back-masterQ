exports.up = function (knex) {
  return knex.schema.createTable("payment", (table) => {
    table.increments().unique();
    table.integer("appointment_id");
    table.foreign("appointment_id").references("appointment_history.id");
    table.decimal("amount");
    table.string("method");
    table.timestamps(false, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("payment");
};
