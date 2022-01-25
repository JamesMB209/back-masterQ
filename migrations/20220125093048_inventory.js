exports.up = function (knex) {
  return knex.schema.createTable("inventory", (table) => {
    table.increments("sku").unique();
    table.integer("business_id");
    table.foreign("business_id").references("business_users.id");
    table.string("drug");
    table.string("dosage");
    table.integer("stock");
    table.decimal("price");
    table.decimal("cost");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("inventory");
};
