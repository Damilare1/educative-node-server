import { DataTypes } from 'sequelize'
import { sequelize } from "../../config/db.js";
import Responses from "./survey_responses.model.js";
import Option from "./survey_options.model.js";

const Question = sequelize.define("survey_question", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  question: {
    type: DataTypes.STRING(150),
  },
  admin_id: {
    type: DataTypes.UUID,
    allowNull: false,
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
