"use strict";

const tablename = "survey_responses";
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
      survey_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "surveys",
          },
          key: "id",
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      question_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "survey_questions",
          },
          key: "id",
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      option_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "survey_options",
          },
          key: "id",
        },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      other: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
