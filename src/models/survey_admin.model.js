import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Survey from "./survey.model.js";
import Question from "./survey_questions.model.js";
import Response from "./survey_responses.model.js";
import Option from "./survey_options.model.js";
const Admin = sequelize.define(
  "survey_admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false, // Disable Sequelize's default createdAt and updatedAt columns
  }
);

Admin.hasMany(Survey, {
  as: "Surveys",
  foreignKey: "admin_id",
  targetKey: "id",
})
Survey.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "author",
  targetKey: "id",
  onDelete: "CASCADE",
});
Admin.hasMany(Question, {
  as: "Questions",
  foreignKey: "admin_id",
  targetKey: "id"
})
Question.belongsTo(Admin, {
  foreignKey: "admin_id",
  targetKey: "id",
  onDelete: "CASCADE",
});
Admin.hasMany(Option, {
  as: "Responses",
  foreignKey: "admin_id",
  targetKey: "id"
})
Option.belongsTo(Admin, {
  foreignKey: "admin_id",
  targetKey: "id",
  onDelete: "CASCADE",
});
export default Admin;
