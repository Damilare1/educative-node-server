import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Question from "./survey_questions.model.js";

const Survey = sequelize.define("survey", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
});

Survey.hasMany(Question, {
  as: "Questions",
  foreignKey: "survey_id",
  targetKey: "id",
});
Question.belongsTo(Survey, {
  foreignKey: "survey_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default Survey;
