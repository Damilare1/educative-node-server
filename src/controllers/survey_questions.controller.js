const Questions = require('../models/survey_questions.model')
const Surveys = require('../models/survey.model')
const InputType = require('../models/survey_input_types.model')

// Create and Save a new question
exports.create = (req, res) => {
  // Create a question
  const question = {
    question: req.body.question,
    survey_id: req.body.survey_id,
    input_type_id: req.body.input_type_id,
  }

  // Save question in the database
  Questions.create(question)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the question.',
      })
    })
}

// Retrieve all questions from the database
exports.findAll = (req, res) => {
  Questions.findAll({
    attributes: ['id', 'question'],
    include: [
      {
        model: Surveys,
      },
      {
        model: InputType,
      },
    ],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving question.',
      })
    })
}

// Retrieve a particular question from the database
exports.findById = (req, res) => {
  const id = req.params.id
  Questions.findByPk(id, {
    attributes: ['id', 'question'],
    include: [
      {
        model: Surveys,
      },
      {
        model: InputType,
      },
    ],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving question.',
      })
    })
}

// Update a question by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Questions.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'question was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update question with id=${id}. Maybe question was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating question with id=' + id,
      })
    })
}

// Delete a question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Questions.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'question was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete question with id=${id}. Maybe question was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete question with id=' + id,
      })
    })
}
