import type { Knex } from "knex";

exports.up = (knex: Knex): Promise<void> => knex.schema.createTable("products_sizes", table => {
  table.increments("id");
  table.text("product_category").references("category").inTable("products");
  table.text("size");
  table.text("price");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = (knex: Knex): Promise<void> => knex.schema.dropTable("products_sizes");