import InputTypes from "../models/survey_input_types.model.js";

// Create and Save a new input type
export const create = async ({ body }) => {
  const inputType = {
    label: body.label,
  };
  try {
    const data = await InputTypes.create(inputType);
    return { body: data, code: 201 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while creating the input type.",
      },
      code: 500,
    };
  }
};

// Retrieve all input types from the database
export const findAll = async () => {
  try {
    const data = await InputTypes.findAll();
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the input type.",
      },
      code: 500,
    };
  }
};

// Retrieve a particular input type from the database
export const findById = async ({ id }) => {
  // id = request.params.id
  try {
    const data = await InputTypes.findByPk(id);
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the input type.",
      },
      code: 500,
    };
  }
};

// Update a input type by the id in the request
export const update = async ({ id }) => {
  try {
    // const id = request.params.id;
    const status = await InputTypes.update(request.body, {
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "input type was updated successfully."
          : `Cannot update input type with id=${id}. Maybe input type was not found or request.body is empty!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Error updating input type with id=${id}`,
      },
      code: 500,
    };
  }
};

// Delete a input type with the specified id in the request
export const deleteFn = async ({ id }) => {
  // const id = request.params.id;

  try {
    const status = await InputTypes.destroy({
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "input type was deleted successfully."
          : `Cannot delete input type with id=${id}. Maybe input type was not found!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Could not delete input type with id=${id}`,
      },
      code: 500,
    };
  }
};
