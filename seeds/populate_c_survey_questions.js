/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('survey_questions').del()
  await knex('survey_questions').insert([
    {
      id: 1,
      survey_id: 1,
      question: 'How satisfied are you with the quality of our products?',
      input_type_id: 1,
      admin_id: 1
    },
    {
      id: 2,
      survey_id: 1,
      question: 'How satisfied are you with the speed of our customer service?',
      input_type_id: 2,
      admin_id: 1
    }
  ]);
};
