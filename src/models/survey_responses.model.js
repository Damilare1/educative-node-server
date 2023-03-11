const { sequelize, Sequelize } = require('../../config/db')
const Option = require('./survey_options.model')

const Response = sequelize.define('survey_response', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  option_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Option,
      key: 'id',
    },
  },
})
Response.belongsTo(Option, {foreignKey: 'option_id', targetKey: 'id'});

module.exports = Response
