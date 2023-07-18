'use strict';
const tablename = 'survey_responses'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(tablename, [
      {
        id: "a776dd0d-3a23-5e43-8daa-41d8e03b4774",
        survey_id: "a50f5732-4d62-4f8c-bd45-7a9809abf8d3",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        option_id: "37a619e3-8a13-4c0e-a2bb-0dfbc0b9baca"
      },
      {
        id: "a776dd0d-4e93-4e48-8daa-41d8e03b4774",
        survey_id: "a50f5732-4d62-4f8c-bd45-7a9809abf8d3",
        question_id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        option_id: "94b6a5c1-6a96-4ea1-9bb3-617c1f605b54"
      },
      {
        id: "a776dd0d-8a23-4e48-8daa-41d8e03b4774",
        survey_id: "a50f5732-4d62-4f8c-bd45-7a9809abf8d3",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        option_id: "a776dd0d-3a23-4e48-8daa-41d8e03b4774"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(tablename, null, {});
  }
};
