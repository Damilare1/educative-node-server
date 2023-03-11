const Responses = require('../models/survey_responses.model')
const Surveys = require('../models/survey.model')
const Options = require('../models/survey_options.model')
const Question = require('../models/survey_questions.model')

// Create and Save a new response
exports.create = (req, res) => {
  // Create a response
  const response = {
    question_id: req.body.question_id,
    survey_id: req.body.survey_id,
    input_type_id: req.body.input_type_id,
  }

  // Save response in the database
  Responses.create(response)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the response.',
      })
    })
}

// Retrieve all responses from the database
exports.findAll = (_, res) => {
  Responses.findAll({
    attributes: ['id'],
    include: [
      {
        model: Surveys,
      },
      {
        model: Question,
      },
      {
        model: Options,
      },
    ],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving response.',
      })
    })
}

// Retrieve a particular response from the database
exports.findById = (req, res) => {
  const id = req.params.id
  Responses.findByPk(id, {
    attributes: ['id'],
    include: [
      {
        model: Surveys,
      },
      {
        model: Question,
      },
      {
        model: Options,
      },
    ],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving response.',
      })
    })
}

// Update a response by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Responses.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'response was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update response with id=${id}. Maybe response was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating response with id=' + id,
      })
    })
}

// Delete a response with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Responses.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'response was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete response with id=${id}. Maybe response was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete response with id=' + id,
      })
    })
}
