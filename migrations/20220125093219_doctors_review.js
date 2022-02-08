exports.up = function (knex) {
  return knex.schema.createTable("doctors_review", (table) => {
    table.increments().unique();
    table.integer("appointment_id");
    table.foreign("appointment_id").references("appointment_history.id");
    table.integer("score");
    table.string("review");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("doctors_review");
};
