'use strict';

const tablename = 'survey_input_types'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable(tablename, {
      id: {
        type: Sequelize.DataTypes.UUID,        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      label: {
        type: Sequelize.DataTypes.STRING(150),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable(tablename);
  }
};
