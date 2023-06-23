import { DataTypes } from 'sequelize'
import { sequelize } from "../../config/db.js";
import Responses from "./survey_responses.model.js";
import Option from "./survey_options.model.js";

const Question = sequelize.define("survey_question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
  }
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

export default Question;
