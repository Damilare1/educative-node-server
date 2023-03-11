const { sequelize, Sequelize } = require('../../config/db')
const Question = require('../models/survey_questions.model');

const Survey = sequelize.define('survey', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  survey_name: {
    type: Sequelize.STRING,
  },
  survey_description: {
    type: Sequelize.STRING,
  },
  is_active: {
    type: Sequelize.TINYINT,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
})

Survey.hasMany(Question, {as: 'Questions', foreignKey: 'survey_id', targetKey: 'id'});
Question.belongsTo(Survey, {foreignKey: 'survey_id', targetKey: 'id'})

module.exports = Survey;
