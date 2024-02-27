import knex, { Knex } from "knex";

exports.up = (knex: Knex): Promise<void> => knex.schema.createTable("acai_extras", table => {
  table.increments("id");
  table.text("name");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = (knex: Knex): Promise<void> => knex.schema.dropTable("acai_extras");