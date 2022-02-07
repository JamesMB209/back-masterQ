exports.up = function (knex) {
  return knex.schema.createTable("appointment_history", (table) => {
    table.increments().unique();
    table.integer("booking_id");
    table.foreign("booking_id").references("booking.id");
    table.integer("business_id");
    table.foreign("business_id").references("business_users.id");
    table.integer("doctor_id");
    table.foreign("doctor_id").references("doctors.id");
    table.integer("patient_id");
    table.foreign("patient_id").references("patients.id");
    table.datetime("arrival");
    table.datetime("departure_doctor");
    table.datetime("departure_pharmacy");
    table.boolean("completed")
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointment_history");
};
