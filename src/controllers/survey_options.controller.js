import Options from "../models/survey_options.model.js";
import Questions from "../models/survey_questions.model.js";

// Create and Save a new option
export const create = async ({ body }) => {
  const { question_id, label } = body;
  const option = {
    question_id,
    label,
  };
  try {
    const data = await Options.create(option);
    return { body: data, code: 201 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while creating the option.",
      },
      code: 500,
    };
  }
};

// Retrieve all options from the database
export const findAll = async () => {
  try {
    const data = await Options.findAll({
      attributes: ["id", "label"],
      include: [
        {
          model: Questions,
          attributes: ["id", "question"],
        },
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: err.message || "Some error occurred while retrieving option.",
      },
      code: 500,
    };
  }
};

// Retrieve a particular option from the database
export const findById = async ({ id }) => {
  try {
    const data = await Options.findByPk(id, {
      attributes: ["id", "label"],
      include: [
        {
          model: Questions,
          attributes: ["id", "question"],
        },
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: err.message || "Some error occurred while retrieving option.",
      },
      code: 500,
    };
  }
};

// Update a option by the id in the request
export const update = async ({ id, body }) => {
  try {
    const status = await Options.update(body, {
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "option was updated successfully."
          : `Cannot update option with id=${id}. Maybe option was not found or req.body is empty!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Error updating option with id=${id}`,
      },
      code: 500,
    };
  }
};

// Delete a option with the specified id in the request
export const deleteFn = async ({ id, body }) => {
  try {
    const status = await InputTypes.destroy(body, {
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "option was deleted successfully!"
          : `Cannot delete option with id=${id}. Maybe option was not found!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Could not delete option with id=${id}`,
      },
      code: 500,
    };
  }
};
