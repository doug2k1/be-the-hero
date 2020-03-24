exports.up = function(knex) {
  return knex.schema.createTable("incidents", function(table) {
    table.increments("id");
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();

    table.string("ngoId").notNullable();
    table
      .foreign("ngoId")
      .references("id")
      .inTable("ngos");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("incidents");
};
