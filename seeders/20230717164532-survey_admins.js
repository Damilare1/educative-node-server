'use strict';
const bcrypt = require("bcryptjs")
const tablename = 'survey_admins';
const saltRounds = 10;

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
    const password1 = await bcrypt.hash("password1", saltRounds)
    const password2 = await bcrypt.hash("password2", saltRounds)
    const password3 = await bcrypt.hash("password3", saltRounds)
    
    await queryInterface.bulkInsert(tablename, [
      {
        id: '40e6215d-b5c6-4896-987c-f30f3678f608',
        email: "user1@example.com",
        username: "user1",
        password: password1,
      },
      {
        id: '40e6321e-b5c6-4896-987c-f30f3678f608',
        email: "user2@example.com",
        username: "user2",
        password: password2,
      },
      {
        id: '40e6321e-b5c6-4896-987c-f30f3678f892',
        email: "user3@example.com",
        username: "user3",
        password: password3,
      },
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
