/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("survey_responses", (table) => {
    table.increments("id");
    table.integer("survey_id").unsigned().references("id").inTable("surveys");
    table
      .integer("question_id")
      .unsigned()
      .references("id")
      .inTable("survey_questions")
      .onDelete("CASCADE");
    table
      .integer("option_id")
      .unsigned()
      .references("id")
      .inTable("survey_options")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable("survey_responses");
};
