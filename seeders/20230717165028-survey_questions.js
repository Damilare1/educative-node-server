'use strict';
const tablename = 'survey_questions'
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
        id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        survey_id: "a50f5732-4d62-4f8c-bd45-7a9809abf8d3",
        question: 'How satisfied are you with the quality of our products?',
        input_type_id: "1",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        survey_id: "a50f5732-4d62-4f8c-bd45-7a9809abf8d3",
        question: 'How satisfied are you with the speed of our customer service?',
        input_type_id: "1",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
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
