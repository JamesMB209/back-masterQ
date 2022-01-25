exports.up = function (knex) {
  return knex.schema.createTable("booking", (table) => {
    table.increments().unique();
    table.integer("business_id");
    table.foreign("business_id").references("business_users.id");
    table.integer("doctor_id");
    table.foreign("doctor_id").references("doctors.id");
    table.integer("patient_id");
    table.foreign("patient_id").references("patients.id");
    table.datetime("date_time");
    table.timestamps(false, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("booking");
};
