"use strict";
const tablename = "survey_options";
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
    const values = [
      {
        id: "37a619e3-8a13-4c0e-a2bb-0dfbc0b9baca",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        label: "Very Satisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "4eb5e3bc-3084-4084-b715-8816992c6e62",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        label: "Satisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "045a2a7d-3a4c-4a50-8c71-d8e61ac30010",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        label: "Neutral",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "94b6a5c1-6a96-4ea1-9bb3-617c1f605b54",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        label: "Dissatisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "a776dd0d-3a23-4e48-8daa-41d8e03b4774",
        question_id: "a50f5732-4d62-444c-bd45-7a9809abf8d3",
        label: "Very Dissatisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "203c7e2a-0b4a-42f7-985c-825857e674a7",
        question_id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        label: "Very Satisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "13c8df52-d3d1-4db7-90e1-313d2f8d9ae7",
        question_id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        label: "Satisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "c5ac3276-b93b-40b2-8970-97e558f8b238",
        question_id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        label: "Neutral",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "0c4a729b-7f78-43cd-953e-1a9fcbf3d3a1",
        question_id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        label: "Dissatisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
      {
        id: "db36e947-5b54-4f4f-96c3-2a72b8db14e4",
        question_id: "a50f5732-6c42-4f8c-bd45-7a9809abf8d3",
        label: "Very Dissatisfied",
        admin_id: '40e6215d-b5c6-4896-987c-f30f3678f608'
      },
    ];
    await queryInterface.bulkInsert(
      tablename,
      values,
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
