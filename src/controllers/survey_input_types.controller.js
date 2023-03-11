const InputTypes = require('../models/survey_input_types.model')

// Create and Save a new input type
exports.create = async (req, res) => {
  const inputType = {
    label: req.body.label,
  }
  try {
    const data = await InputTypes.create(inputType)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the input type.',
    })
  }
}

// Retrieve all input types from the database
exports.findAll = async (_, res) => {
  try {
    const data = await InputTypes.findAll()
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while retrieving input type.',
    })
  }
}

// Retrieve a particular input type from the database
exports.findById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await InputTypes.findByPk(id)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while retrieving input type.',
    })
  }
}

// Update a input type by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const status = await InputTypes.update(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'input type was updated successfully.'
          : `Cannot update input type with id=${id}. Maybe input type was not found or req.body is empty!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Error updating input type with id=${id}`,
    })
  }
}

// Delete a input type with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    const id = req.params.id
    const status = await InputTypes.destroy(req.body, {
      where: { id: id },
    })
    const data = {
      message:
        status === 1
          ? 'input type was deleted successfully.'
          : `Cannot delete input type with id=${id}. Maybe input type was not found!`,
    }
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: `Could not delete input type with id=${id}`,
    })
  }
}
