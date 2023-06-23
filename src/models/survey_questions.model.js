const { sequelize, Sequelize } = require("../../config/db");
const Survey = require("./survey.model");
const Responses = require("./survey_responses.model");
const Option = require("./survey_options.model");

const Question = sequelize.define("survey_question", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  question: {
    type: Sequelize.STRING,
  },
  survey_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Survey,
      key: "id",
    },
  },
});

Question.hasMany(Responses, {
  as: "Responses",
  foreignKey: "question_id",
  targetKey: "id",
});
Responses.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

Question.hasMany(Option, {
  as: "options",
  foreignKey: "question_id",
  targetKey: "id",
});
Option.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

module.exports = Question;
