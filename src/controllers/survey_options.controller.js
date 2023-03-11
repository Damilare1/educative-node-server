const Options = require('../models/survey_options.model')
const Question = require('../models/survey_questions.model')

// Create and Save a new option
exports.create = (req, res) => {
  // Create a option
  const option = {
    question_id: req.body.question_id,
    label: req.body.label
  }

  // Save option in the database
  Options.create(option)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the option.',
      })
    })
}

// Retrieve all options from the database
exports.findAll = (req, res) => {
  Options.findAll({
    attributes: ['id', 'label'],
    include: [
      {
        model: Question,
        attributes: ['id', 'question'],
      }
    ],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving option.',
      })
    })
}

// Retrieve a particular option from the database
exports.findById = (req, res) => {
  const id = req.params.id
  Options.findByPk(id, {
    attributes: ['id', 'label'],
    include: [
      {
        model: Question,
        attributes: ['id', 'question'],
      }
    ],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving option.',
      })
    })
}

// Update a option by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Options.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'option was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update option with id=${id}. Maybe option was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating option with id=' + id,
      })
    })
}

// Delete a option with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Options.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'option was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete option with id=${id}. Maybe option was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete option with id=' + id,
      })
    })
}
