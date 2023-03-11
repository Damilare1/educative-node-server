const Responses = require('../models/survey_responses.model')
const Surveys = require('../models/survey.model')
const Options = require('../models/survey_options.model')
const Questions = require('../models/survey_questions.model')

// Create and Save a new response
exports.create = async (req, res) => {
  const response = {
    question_id: req.body.question_id,
    survey_id: req.body.survey_id,
    input_type_id: req.body.input_type_id,
  }
  try {
    const data = await Responses.create(response)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the response.',
    })
  }
}

// Retrieve all responses from the database
exports.findAll = async (_, res) => {
  try {
    const data = await Responses.findAll({
      attributes: ['id'],
      include: [
        {
          model: Surveys,
        },
        {
          model: Questions,
        },
        {
          model: Options,
        },
      ],
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving response.',
    })
  }
}

// Retrieve a particular response from the database
exports.findById = async (_, res) => {
  try {
    const id = req.params.id
    const data = await Responses.findByPk(id, {
      attributes: ['id'],
      include: [
        {
          model: Surveys,
        },
        {
          model: Questions,
        },
        {
          model: Options,
        },
      ],
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving response.',
    })
  }
}

// Update a response by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Responses.update(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'response was updated successfully.'
          : `Cannot update response with id=${id}. Maybe response was not found or req.body is empty!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Error updating response with id=${id}`,
    })
  }
}

// Delete a response with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Responses.destroy({
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'response was deleted successfully!'
          : `Cannot delete response with id=${id}. Maybe response was not found!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Could not delete response with id=${id}`,
    })
  }
}
