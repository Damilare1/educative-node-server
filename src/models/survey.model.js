import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Question from "./survey_questions.model.js";
import Response from "./survey_responses.model.js";

const Survey = sequelize.define("survey", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  survey_name: {
    type: DataTypes.STRING(50),
  },
  survey_description: {
    type: DataTypes.STRING(150),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  admin_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
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
Survey.hasMany(Response, {
  as: "Responses",
  foreignKey: "survey_id",
  targetKey: "id",
});
Response.belongsTo(Survey, {
  foreignKey: "survey_id",
  targetKey: "id",
  onDelete: "CASCADE",
});

Survey.sync({ alter: true })

export default Survey;
