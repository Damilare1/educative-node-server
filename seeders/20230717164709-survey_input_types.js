"use strict";
const tablename = "survey_input_types";
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
          id: "0ab3b3f1-829a-4f48-9a4b-52dbdb24f846",
          label: "Multiple Choice",
        },
        {
          id: "a6c2e9e0-23a3-4bfc-b60e-6b68b2e8d678",
          label: "Rating Scale",
        },
        {
          id: "c7b8482d-8c29-4a1e-8b55-acc6c1c98d16",
          label: "Free Response",
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
