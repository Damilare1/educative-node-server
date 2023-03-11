const Surveys = require('../models/survey.model')
const InputType = require('../models/survey_input_types.model')
const Options = require('../models/survey_options.model')
const Response = require('../models/survey_responses.model')
// Create and Save a new Survey
exports.create = (req, res) => {
  // Create a Survey
  const survey = {
    survey_name: req.body.survey_name,
    survey_description: req.body.survey_description,
    is_active: +req.body.is_active,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  }

  // Save Survey in the database
  Surveys.create(survey)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the survey.',
      })
    })
}

// Retrieve all Surveys from the database
exports.findAll = (_, res) => {
  Surveys.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving survey.',
      })
    })
}

// Retrieve all Questions for a Particular survey from the database
exports.findAllSurveyQuestionsBySurveyId = async (req, res) => {
  const id = req.params.id
  try {
    const survey = await Surveys.findByPk(id)
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`)
    const question = await survey.getQuestions({
      attributes: ['id', 'question'],
      include: {
        model: InputType,
      },
    })
    const data = survey.get()
    res.send({ ...data, questions: question })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving survey.',
    })
  }
}

// Retrieve a particular Survey from the database
exports.findById = (req, res) => {
  const id = req.params.id
  Surveys.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving survey.',
      })
    })
}

// Update a survey by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Surveys.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Survey was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Survey with id=' + id,
      })
    })
}

// Delete a survey with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Surveys.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Survey was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Survey with id=' + id,
      })
    })
}

// Retrieve a particular response from the database
exports.findQuestionResponsesBySurveyId = async (req, res) => {
  const id = req.params.id
  try {
    const survey = await Surveys.findByPk(id)
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`)
    const question = await survey.getQuestions({
      attributes: ['id', 'question'],
      include: [
        {
          model: Response,
          attributes: ['id'],
          include:{
            model: Options,
            attributes: ['id','label']
          },
          as: 'Responses'
        },
      ],
    })
    const data = survey.get()
    res.send({ ...data, questions: question })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving survey.',
    })
  }
}
