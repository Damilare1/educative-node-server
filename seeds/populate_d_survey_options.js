/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  const values = [
    {
      id: 1,
      question_id: 1,
      label: "Very Satisfied",
    },
    {
      id: 2,
      question_id: 1,
      label: "Satisfied",
    },
    {
      id: 3,
      question_id: 1,
      label: "Neutral",
    },
    {
      id: 4,
      question_id: 1,
      label: "Dissatisfied",
    },
    {
      id: 5,
      question_id: 1,
      label: "Very Dissatisfied",
    },
    {
      id: 6,
      question_id: 2,
      label: "Very Satisfied",
    },
    {
      id: 7,
      question_id: 2,
      label: "Satisfied",
    },
    {
      id: 8,
      question_id: 2,
      label: "Neutral",
    },
    {
      id: 9,
      question_id: 2,
      label: "Dissatisfied",
    },
    {
      id: 10,
      question_id: 2,
      label: "Very Dissatisfied",
    },
  ];

  // Deletes ALL existing entries
  await knex("survey_options").del();
  await knex("survey_options").insert(
    values.map((value) => ({ ...value, admin_id: 1 }))
  );
};
