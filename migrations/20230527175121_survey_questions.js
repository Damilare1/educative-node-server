/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("survey_questions", (table) => {
    table.increments("id"); // this represents the primary key.
    table.integer("survey_id").unsigned().references("id").inTable("surveys");
    table.string("question", 150); // this is a column.
    table
      .integer("input_type_id")
      .unsigned()
      .references("id")
      .inTable("survey_input_types");
    table
      .integer("admin_id")
      .unsigned()
      .references("id")
      .inTable("survey_admins")
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("survey_questions");
};
