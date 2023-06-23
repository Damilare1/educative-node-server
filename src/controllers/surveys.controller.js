const Surveys = require("../models/survey.model");
const InputTypes = require("../models/survey_input_types.model");
const Options = require("../models/survey_options.model");
const Responses = require("../models/survey_responses.model");

// Create and Save a new Survey
exports.create = async ({ body, user }) => {
  const { survey_name, survey_description, is_active, start_date, end_date } =
    body;
  const survey = {
    survey_name,
    survey_description,
    is_active,
    start_date,
    end_date,
  };
  try {
    // const user = req.user;
    survey.admin_id = user.admin_id;
    const data = await Surveys.create(survey);
    const { survey_name, survey_description, is_active, start_date, end_date } =
      data;
    const responseData = {
      survey_name,
      survey_description,
      is_active,
      start_date,
      end_date,
    };
    return { body: responseData, code: 201 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while creating the survey.",
      },
      code: 500,
    };
  }
};

// Retrieve all Surveys from the database
exports.findAll = async () => {
  try {
    const data = await Surveys.findAll();
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the survey.",
      },
      code: 500,
    };
  }
};

// Retrieve all Questions for a Particular survey from the database
exports.findAllSurveyQuestionsBySurveyId = async ({ id }) => {
  try {
    // const id = req.params.id;
    const survey = await Surveys.findByPk(id);
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`);
    const question = await survey.getQuestions({
      attributes: ["id", "question"],
      include: [
        {
          model: InputTypes,
          as: "input_type",
          attributes: ["id", "label"],
        },
        {
          model: Options,
          as: "options",
          attributes: ["id", "label"],
        },
      ],
    });
    const data = survey.get();
    return { body: { ...data, questions: question }, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the survey.",
      },
      code: 500,
    };
  }
};

// Retrieve a particular Survey from the database
exports.findById = async ({ id }) => {
  try {
    // const id = req.params.id;
    const data = await Surveys.findByPk(id);
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the survey.",
      },
      code: 500,
    };
  }
};

// Update a survey by the id in the request
exports.update = async ({ id, body }) => {
  try {
    // const id = req.params.id;
    const status = await Surveys.update(body, {
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "Survey was updated successfully."
          : `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message:`Error updating Survey with id=${id}`,
      },
      code: 500,
    };
  }
};

// Delete a survey with the specified id in the request
exports.delete = async ({ id }) => {
  try {
    const status = await Surveys.destroy({
      where: { id: id },
    });
    const data = {
      message:
        status === 1
          ? "Survey was deleted successfully!"
          : `Cannot delete Survey with id=${id}. Maybe Survey was not found!`,
    };
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: `Could not delete Survey with id=${id}`,
      },
      code: 500,
    };
  }
};

// Retrieve a particular response from the database
exports.findQuestionResponsesBySurveyId = async ({ id }) => {
  try {
    // const id = req.params.id;
    const survey = await Surveys.findByPk(id);
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`);
    const question = await survey.getQuestions({
      attributes: ["id", "question"],
      include: [
        {
          model: Responses,
          attributes: ["id"],
          include: {
            model: Options,
            attributes: ["id", "label"],
          },
          as: "Responses",
        },
      ],
    });
    const data = survey.get();
    return { body: { ...data, questions: question }, code: 200 };
  } catch (err) {
    return {
      error: {
        message: err.message || "Some error occurred while retrieving survey.",
      },
      code: 500,
    };
  }
};

// Retrieve surveys created by logged in user
exports.findLoggedInUserSurveys = async ({ user }) => {
  try {
    const { admin_id } = user;
    const data = await Surveys.findAll({
      where: {
        admin_id,
      },
      attributes: [
        "survey_name",
        "survey_description",
        "is_active",
        "start_date",
        "end_date",
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    return {
      error: {
        message: err.message || "Some error occurred while retrieving surveys.",
      },
      code: 500,
    };
  }
};
