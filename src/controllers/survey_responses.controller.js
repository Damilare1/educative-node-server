import Responses from "../models/survey_responses.model.js";
import Surveys from "../models/survey.model.js";
import Options from "../models/survey_options.model.js";
import Questions from "../models/survey_questions.model.js";

// Create and Save a new response
export const create = async ({ body }) => {
  const { question_id, survey_id, input_type_id, option_id } = body;
  const response = {
    question_id,
    survey_id,
    input_type_id,
    option_id,
  };
  try {
    const data = await Responses.create(response);
    return { body: data, code: 201 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while creating the response.",
      },
      code: 500,
    };
  }
};

// Retrieve all responses from the database
export const findAll = async (_, res) => {
  try {
    const data = await Responses.findAll({
      attributes: ["id"],
      include: [
        { 
          model: Questions
        },
        {
          model: Options,
        },
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the response.",
      },
      code: 500,
    };
  }
};

// Retrieve a particular response from the database
export const findById = async (_, res) => {
  try {
    const id = req.params.id;
    const data = await Responses.findByPk(id, {
      attributes: ["id"],
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
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the response.",
      },
      code: 500,
    };
  }
};

// Update a response by the id in the request
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await Responses.update(req.body, {
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "response was updated successfully."
          : `Cannot update response with id=${id}. Maybe response was not found or req.body is empty!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Error updating response with id=${id}`,
      },
      code: 500,
    };
  }
};

// Delete a response with the specified id in the request
export const deleteFn = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await Responses.destroy({
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "response was deleted successfully!"
          : `Cannot delete response with id=${id}. Maybe response was not found!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Could not delete response with id=${id}`,
      },
      code: 500,
    };
  }
};
