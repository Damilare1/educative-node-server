const Options = require('../models/survey_options.model')
const Questions = require('../models/survey_questions.model')

// Create and Save a new option
exports.create = async (req, res) => {
  const option = {
    question_id: req.body.question_id,
    label: req.body.label,
  }
  try {
    const data = await Options.create(option)
    res.status(201).send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the option.',
    })
  }
}

// Retrieve all options from the database
exports.findAll = async (_, res) => {
  try {
    const data = await Options.findAll({
      attributes: ['id', 'label'],
      include: [
        {
          model: Questions,
          attributes: ['id', 'question'],
        },
      ],
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving option.',
    })
  }
}

// Retrieve a particular option from the database
exports.findById = async (_, res) => {
  try {
    const data = await Options.findByPk(id, {
      attributes: ['id', 'label'],
      include: [
        {
          model: Questions,
          attributes: ['id', 'question'],
        },
      ],
    })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving option.',
    })
  }
}

// Update a option by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const status = await Options.update(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'option was updated successfully.'
          : `Cannot update option with id=${id}. Maybe option was not found or req.body is empty!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Error updating option with id=${id}`,
    })
  }
}

// Delete a option with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const status = await InputTypes.destroy(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'option was deleted successfully!'
          : `Cannot delete option with id=${id}. Maybe option was not found!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Could not delete option with id=${id}`,
    })
  }
}
