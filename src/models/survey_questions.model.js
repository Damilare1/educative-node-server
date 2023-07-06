import { DataTypes } from 'sequelize'
import { sequelize } from "../../config/db.js";
import Responses from "./survey_responses.model.js";
import Option from "./survey_options.model.js";

const Question = sequelize.define("survey_question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  question: {
    type: DataTypes.STRING,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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

Question.Option = Question.hasMany(Option, {
  as: "options",
  foreignKey: "question_id",
  targetKey: "id",
  onDelete: "CASCADE"
});
Option.Question = Option.belongsTo(Question, {
  foreignKey: "question_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default Question;
