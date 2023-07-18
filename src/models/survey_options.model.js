import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
import Responses from "./survey_responses.model.js";

const Option = sequelize.define('survey_option', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  label: {
    type: DataTypes.STRING(150),
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
Option.hasMany(Responses, {
  as: "responses",
  foreignKey: "option_id",
  targetKey: "id",
});
Responses.belongsTo(Option, {
  foreignKey: "option_id",
  targetKey: "id",
  onDelete: "SET NULL",
});

export default Option;
