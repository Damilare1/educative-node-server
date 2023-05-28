/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('surveys').del()
  await knex('surveys').insert([
    {
      id: 1,
      survey_name: 'Customer Satisfaction Survey',
      survey_description:
        'This survey is designed to measure customer satisfaction with our products and services.',
      is_active: 1,
      start_date: '2022-03-01',
      end_date: '2022-03-31',
      admin_id: 1,
    },
    {
      id: 2,
      survey_name: 'Employee Engagement Survey',
      survey_description:
        'This survey is designed to measure employee engagement and satisfaction with their work.',
      is_active: 1,
      start_date: '2022-04-01',
      end_date: '2022-04-30',
      admin_id: 2,
    },
  ])
}
