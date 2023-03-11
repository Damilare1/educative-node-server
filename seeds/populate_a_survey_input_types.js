/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('survey_input_types').del()
  await knex('survey_input_types').insert([
    {
      id: 1,
      label: 'Multiple Choice'
    },
    {
      id: 2,
      label: 'Rating Scale'
    },
    {
      id: 3,
      label: 'Free Response'
    }
  ]);
};
