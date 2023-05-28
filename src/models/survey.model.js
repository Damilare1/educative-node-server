const { sequelize, Sequelize } = require("../../config/db");
const Question = require("./survey_questions.model");
const Admin = require("./survey_admin.model");

const Survey = sequelize.define("survey", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  survey_name: {
    type: Sequelize.STRING,
  },
  survey_description: {
    type: Sequelize.STRING,
  },
  is_active: {
    type: Sequelize.TINYINT,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
  admin_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Admin,
      key: "id",
    },
  },
});

Survey.hasMany(Question, {
  as: "Questions",
  foreignKey: "survey_id",
  targetKey: "id",
});
Question.belongsTo(Survey, { foreignKey: "survey_id", targetKey: "id" });
Survey.belongsTo(Admin, {foreignKey: 'admin_id', targetKey: 'id'});

module.exports = Survey;
