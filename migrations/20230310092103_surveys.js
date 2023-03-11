/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('surveys', table => {
        table.increments('id') // this represents the primary key.
        table.string('survey_name', 50) // this is a column.
        table.string('survey_description', 150) // this is a column.
        table.tinyint('is_active') // this is a column.
        table.date('start_date') // this is a column.
        table.date('end_date') // this is a column.
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("surveys")
};
