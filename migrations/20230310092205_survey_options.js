/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('survey_options', table => {
    table.increments('id')
    table.integer('question_id').unsigned().references('id').inTable('survey_questions');
    table.string('label', 150)
}) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("survey_options")
};
