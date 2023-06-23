import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Survey from "./survey.model.js";
const Admin = sequelize.define(
  "survey_admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
  targetKey: "id",
  onDelete: "CASCADE",
});
export default Admin;
