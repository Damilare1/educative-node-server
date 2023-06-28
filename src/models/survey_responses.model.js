import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const Response = sequelize.define("survey_response", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});


export default Response;
