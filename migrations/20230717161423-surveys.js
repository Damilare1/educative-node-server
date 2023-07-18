"use strict";

const tablename = "surveys";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable(tablename, {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      survey_name: {
        type: Sequelize.DataTypes.STRING(50),
      },
      survey_description: {
        type: Sequelize.DataTypes.STRING(150),
      },
      is_active: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      start_date: {
        type: Sequelize.DataTypes.DATE,
      },
      end_date: {
        type: Sequelize.DataTypes.DATE,
      },
      admin_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "survey_admins",
          },
          key: "id",
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable(tablename);
  },
};
