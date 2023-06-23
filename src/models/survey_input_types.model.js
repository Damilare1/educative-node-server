const { sequelize, Sequelize } = require("../../config/db");
const Question = require("./survey_questions.model");

const InputType = sequelize.define("survey_input_type", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  label: {
    type: Sequelize.STRING,
  },
});

InputType.hasMany(Question, {
  as: "Questions",
  foreignKey: "input_type_id",
  targetKey: "id",
});
Question.belongsTo(InputType, {
  as: "input_type",
  foreignKey: "input_type_id",
  targetKey: "id",
  onDelete: "SET NULL",
});

module.exports = InputType;
