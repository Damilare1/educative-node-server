const { sequelize, Sequelize } = require('../../config/db')
const Question = require('./survey_questions.model')

const Option = sequelize.define('survey_option', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  question_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Question,
      key: 'id',
    },
  },
  label: {
    type: Sequelize.STRING,
  }
})

module.exports = Option;
