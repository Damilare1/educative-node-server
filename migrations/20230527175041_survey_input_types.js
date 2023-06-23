/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
    .createTable('survey_input_types', table => {
    table.increments('id')
    table.string('label', 150)
}) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema
    .dropTable("survey_input_types")
};
