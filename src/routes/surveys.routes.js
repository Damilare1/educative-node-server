const surveys = require('../controllers/surveys.controller.js')

module.exports = (app) => {
  var router = require('express').Router()
  // Create a new Survey
  router.post('/', surveys.create)

  // Retrieve all Survey
  router.get('/', surveys.findAll)

  // Retrieve all Survey
  router.get('/:id', surveys.findById)

  // Retrieve all responses to questions for a particular survey
  router.get('/:id/responses', surveys.findQuestionResponsesBySurveyId)

  // Retrie all questions for a particular survey
  router.get('/:id/questions', surveys.findAllSurveyQuestionsBySurveyId)

  // Update a Survey with id
  router.put('/:id', surveys.update)

  // Delete a Survey with id
  router.delete('/:id', surveys.delete)

  app.use('/api/surveys', router)
}
