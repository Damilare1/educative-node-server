import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Response = sequelize.define("survey_responses", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  other: {
    type: DataTypes.STRING,
    allowNull: true
  }
});


export default Response;
