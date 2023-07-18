"use strict";

const tablename = "survey_questions";
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
      question: {
        type: Sequelize.DataTypes.STRING(150),
      },
      input_type_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "survey_input_types",
          },
          key: "id",
        },
        onDelete: 'CASCADE',
        allowNull: false,
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
