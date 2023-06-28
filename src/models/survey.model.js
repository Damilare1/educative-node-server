import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Question from "./survey_questions.model.js";

const Survey = sequelize.define("survey", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  survey_name: {
    type: DataTypes.STRING,
  },
  survey_description: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.TINYINT,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Survey.Question = Survey.hasMany(Question, {
  as: "questions",
  foreignKey: "survey_id",
  targetKey: "id",
});
Question.Survey = Question.belongsTo(Survey, {
  onDelete: "CASCADE",
  foreignKey: "survey_id",
  targetKey: "id",
});

export default Survey;
