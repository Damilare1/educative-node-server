import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Question from "./survey_questions.model.js";

const InputType = sequelize.define("survey_input_type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  label: {
    type: DataTypes.STRING(150),
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

export default InputType;
