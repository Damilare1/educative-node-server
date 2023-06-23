import { Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";
import Responses from "./survey_responses.model.js";

const Option = sequelize.define('survey_option', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  label: {
    type: Sequelize.STRING,
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
