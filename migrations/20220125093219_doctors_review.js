exports.up = function (knex) {
  return knex.schema.createTable("doctors_review", (table) => {
    table.increments().unique();
    table.integer("appointment_id");
    table.foreign("appointment_id").references("appointment_history.id");
    table.string("review");
    table.timestamps(false, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("doctors_review");
};
