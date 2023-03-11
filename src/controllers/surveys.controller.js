const Surveys = require('../models/survey.model')
const InputTypes = require('../models/survey_input_types.model')
const Options = require('../models/survey_options.model')
const Responses = require('../models/survey_responses.model')

// Create and Save a new Survey
exports.create = async (req, res) => {
  const survey = {
    survey_name: req.body.survey_name,
    survey_description: req.body.survey_description,
    is_active: +req.body.is_active,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  }
  try {
    const data = await Surveys.create(survey)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the survey.',
    })
  }
}

// Retrieve all Surveys from the database
exports.findAll = async (_, res) => {
  try {
    const data = await Surveys.findAll()
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving survey.',
    })
  }
}

// Retrieve all Questions for a Particular survey from the database
exports.findAllSurveyQuestionsBySurveyId = async (req, res) => {
  try {
    const id = req.params.id
    const survey = await Surveys.findByPk(id)
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`)
    const question = await survey.getQuestions({
      attributes: ['id', 'question'],
      include: {
        model: InputTypes,
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
exports.findById = async (_, res) => {
  try {
    const id = req.params.id
    const data = await Surveys.findByPk(id)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving survey.',
    })
  }
}

// Update a survey by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Surveys.update(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'Survey was updated successfully.'
          : `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Error updating Survey with id=${id}`,
    })
  }
}

// Delete a survey with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Surveys.destroy({
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'Survey was deleted successfully!'
          : `Cannot delete Survey with id=${id}. Maybe Survey was not found!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Survey with id=${id}`,
    })
  }
}

// Retrieve a particular response from the database
exports.findQuestionResponsesBySurveyId = async (req, res) => {
  try {
    const id = req.params.id
    const survey = await Surveys.findByPk(id)
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`)
    const question = await survey.getQuestions({
      attributes: ['id', 'question'],
      include: [
        {
          model: Responses,
          attributes: ['id'],
          include: {
            model: Options,
            attributes: ['id', 'label'],
          },
          as: 'Responses',
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
