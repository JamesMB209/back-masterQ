exports.up = function (knex) {
  return knex.schema.createTable("diagnosis", (table) => {
    table.increments().unique();
    table.integer("appointment_id");
    table.foreign("appointment_id").references("appointment_history.id");
    table.string("diagnosis");
    table.boolean("follow_up");
    table.boolean("sick_leave");
    table.decimal("visit_cost");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("diagnosis");
};
