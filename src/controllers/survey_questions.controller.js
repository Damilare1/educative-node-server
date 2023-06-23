const Questions = require("../models/survey_questions.model");
const Surveys = require("../models/survey.model");
const InputTypes = require("../models/survey_input_types.model");

// Create and Save a new question
exports.create = async ({ body }) => {
  const { question, survey_id, input_type_id } = body;
  const payload = {
    question,
    survey_id,
    input_type_id,
  };
  try {
    const data = await Questions.create(payload);
    return { body: data, code: 201 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while creating the question.",
      },
      code: 500,
    };
  }
};

// Retrieve all questions from the database
exports.findAll = async () => {
  try {
    const data = await Questions.findAll({
      attributes: ["id", "question"],
      include: [
        {
          model: Surveys,
        },
        {
          model: InputTypes,
        },
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the question.",
      },
      code: 500,
    };
  }
};

// Retrieve a particular question from the database
exports.findById = async ({ id }) => {
  try {
    const data = await Questions.findByPk(id, {
      attributes: ["id", "question"],
      include: [
        {
          model: Surveys,
        },
        {
          model: InputTypes,
        },
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the question.",
      },
      code: 500,
    };
  }
};

// Update a question by the id in the request
exports.update = async ({ id }) => {
  try {
    const status = await Questions.update(req.body, {
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "question was updated successfully."
          : `Cannot update question with id=${id}. Maybe question was not found or req.body is empty!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Error updating question with id=${id}`,
      },
      code: 500,
    };
  }
};

// Delete a question with the specified id in the request
exports.delete = async ({ id }) => {
  try {
    const status = await Questions.destroy({
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "question was deleted successfully!"
          : `Cannot delete question with id=${id}. Maybe question was not found!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Could not delete question with id=${id}`,
      },
      code: 500,
    };
  }
};
