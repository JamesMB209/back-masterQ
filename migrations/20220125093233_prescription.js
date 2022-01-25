exports.up = function (knex) {
  return knex.schema.createTable("prescription", (table) => {
    table.increments().unique();
    table.integer("drug");
    table.foreign("drug").references("inventory.sku");
    table.integer("diagnosis_id");
    table.foreign("diagnosis_id").references("diagnosis.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("prescription");
};
