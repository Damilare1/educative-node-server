const InputTypes = require("../models/survey_input_types.model");

// Create and Save a new input type
exports.create = (req, res) => {
  // Create a input type
  const inputTypes = {
    label: req.body.label,
  };

  // Save input type in the database
  InputTypes.create(inputTypes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the input type."
      });
    });
};

// Retrieve all input types from the database
exports.findAll = (req, res) => {
  InputTypes.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving input type."
      });
    });
};

// Retrieve a particular input type from the database
exports.findById = (req, res) => {
  const id = req.params.id;
  InputTypes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving input type."
      });
    });
};

// Update a input type by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  InputTypes.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "input type was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update input type with id=${id}. Maybe input type was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating input type with id=" + id
      });
    });
};

// Delete a input type with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  InputTypes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "input type was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete input type with id=${id}. Maybe input type was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete input type with id=" + id
      });
    });
};