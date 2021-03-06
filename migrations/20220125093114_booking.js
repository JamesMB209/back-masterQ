exports.up = function (knex) {
  return knex.schema.createTable("booking", (table) => {
    table.increments().unique();
    table.integer("business_id").nullable()
    table.foreign("business_id").references("business_users.id");
    table.integer("doctor_id");
    table.foreign("doctor_id").references("doctors.id");
    table.integer("patient_id");
    table.foreign("patient_id").references("patients.id");
    table.datetime("date_time");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("booking");
};
