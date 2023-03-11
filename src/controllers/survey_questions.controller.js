const Questions = require('../models/survey_questions.model')
const Surveys = require('../models/survey.model')
const InputTypes = require('../models/survey_input_types.model')

// Create and Save a new question
exports.create = async (req, res) => {
  const question = {
    question: req.body.question,
    survey_id: req.body.survey_id,
    input_type_id: req.body.input_type_id,
  }
  try {
    const data = await Questions.create(question)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the question.',
    })
  }
}

// Retrieve all questions from the database
exports.findAll = async (_, res) => {
  try {
    const data = await Questions.findAll({
      attributes: ['id', 'question'],
      include: [
        {
          model: Surveys,
        },
        {
          model: InputTypes,
        },
      ],
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving question.',
    })
  }
}

// Retrieve a particular question from the database
exports.findById = async (_, res) => {
  try {
    const id = req.params.id
    const data = await Questions.findByPk(id, {
      attributes: ['id', 'question'],
      include: [
        {
          model: Surveys,
        },
        {
          model: InputTypes,
        },
      ],
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving question.',
    })
  }
}

// Update a question by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Questions.update(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'question was updated successfully.'
          : `Cannot update question with id=${id}. Maybe question was not found or req.body is empty!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Error updating question with id=${id}`,
    })
  }
}

// Delete a question with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Questions.destroy({
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'question was deleted successfully!'
          : `Cannot delete question with id=${id}. Maybe question was not found!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Could not delete question with id=${id}`,
    })
  }
}
