"use strict";
const tablename = "surveys";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      tablename,
      [
        {
          id: "a50f5732-4d62-4f8c-bd45-7a9809abf8d3",
          survey_name: "Customer Satisfaction Survey",
          survey_description:
            "This survey is designed to measure customer satisfaction with our products and services.",
          is_active: true,
          start_date: "2022-03-01",
          end_date: "2022-03-31",
          admin_id: "40e6215d-b5c6-4896-987c-f30f3678f608",
        },
        {
          id: "e07ce739-6925-46ce-9b89-0f20666f8b2d",
          survey_name: "Employee Engagement Survey",
          survey_description:
            "This survey is designed to measure employee engagement and satisfaction with their work.",
          is_active: true,
          start_date: "2022-04-01",
          end_date: "2022-04-30",
          admin_id: "40e6321e-b5c6-4896-987c-f30f3678f608",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(tablename, null, {});
  },
};
