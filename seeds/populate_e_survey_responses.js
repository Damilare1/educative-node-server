/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('survey_responses').del()
  await knex('survey_responses').insert([
    {
      id: 1,
      survey_id: 1,
      question_id: 1,
      option_id: 1
    },
    {
      id: 2,
      survey_id: 1,
      question_id: 2,
      option_id: 6
    },
    {
      id: 3,
      survey_id: 1,
      question_id: 1,
      option_id: 2
    }
  ]);
};
