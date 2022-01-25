exports.up = function (knex) {
  return knex.schema.createTable("vaccination", (table) => {
    table.increments().unique();
    table.integer("patient_id");
    table.foreign("patient_id").references("patients.id");
    table.string("name");
    table.string("note");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vaccination");
};
