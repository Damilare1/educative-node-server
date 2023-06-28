import Surveys from "../models/survey.model.js";
import InputTypes from "../models/survey_input_types.model.js";
import Options from "../models/survey_options.model.js";
import Responses from "../models/survey_responses.model.js";
import Questions from "../models/survey_questions.model.js";

// Create and Save a new Survey
export const create = async ({ body, user }) => {
  const { admin_id } = user;
  const {
    survey_name,
    survey_description,
    is_active,
    start_date,
    end_date,
    questions,
  } = body;
  questions.forEach((question) => {
    question.admin_id = admin_id;
    if (question.options) {
      question.options.forEach((option) => {
        option.admin_id = admin_id;
      });
    }
  });
  const survey = {
    survey_name,
    survey_description,
    is_active,
    start_date,
    end_date,
    questions,
  };
  try {
    survey.admin_id = user.admin_id;
    const data = await Surveys.create(survey, {
      include: [{ association: Surveys.Question, include: Questions.Option }],
    });

    const {
      survey_name,
      survey_description,
      is_active,
      start_date,
      end_date,
      questions,
    } = data;
    const responseData = {
      survey_name,
      survey_description,
      is_active,
      start_date,
      end_date,
      questions,
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
export const findAll = async () => {
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
export const findAllSurveyQuestionsBySurveyId = async ({ id }) => {
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
export const findById = async ({ id, user }) => {
  try {
    console.log(id);
    const data = await Surveys.findByPk(id, {
      include: [
        {
          model: Questions,
          as: "questions",
          attributes: ["id", "question", "input_type_id"],
          include: {
            model: Options,
            as: "options",
            attributes: ["id", "label"],
          },
        },
      ],
    });
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

const findOrCreateSurvey = async (body, user) => {
  const { questions, admin_id, id, ...rest } = body;
  const surveyBody = { ...rest, admin_id: user.admin_id };
  let s;
  if (id) {
    s = await Surveys.findOne({
      where: {
        id,
        admin_id: user.admin_id,
      },
    });

    if (s) {
      await s.update(rest);
      return s.get({
        plain: true,
      });
    }
  }
  s = await Surveys.create(surveyBody);

  return s.get({
    plain: true,
  });
};

const findOrCreateSurveyQuestion = async (question, user) => {
  const { options, admin_id, id, survey_id, ...rest } = question;
  const qBody = {
    ...rest,
    survey_id,
    admin_id: user.admin_id,
  };
  let q;
  if (id) {
    q = await Questions.findOne({
      where: {
        id,
        admin_id: user.admin_id,
      },
    });

    if (q) {
      await q.update(rest);
      return q.get({
        plain: true,
      });
    }
  }
  q = await Questions.create(qBody);

  return q.get({
    plain: true,
  });
};

const findOrCreateSurveyQuestionOption = async (option, user) => {
  const { admin_id, id, survey_id, question_id, ...rest } = option;
  const optionBody = {
    ...rest,
    question_id,
    admin_id: user.admin_id,
  };
  let opt = {};
  if (id) {
    opt = await Options.findOne({
      where: {
        id,
        admin_id: user.admin_id,
        question_id,
      },
    });

    if (opt) {
      await opt.update(rest);
      return opt.get({
        plain: true,
      });
    }
  }
  opt = await Options.create(optionBody);
  return opt.get({
    plain: true,
  });
};

// Update a survey by the id in the request
export const update = async ({ id, body, user }) => {
  try {
    const status = await Surveys.update(body, {
      where: { id: id, admin_id: user.admin_id },
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
        message: `Error updating Survey with id=${id}`,
      },
      code: 500,
    };
  }
};

// Update a survey by the id in the request
export const updateOrCreateSurvey = async ({ body, user }) => {
  const data = {
    is_error: false,
  };
  try {
    const survey = await findOrCreateSurvey(body, user);
    console.log("survey", survey);
    if (body.questions && body.questions.length) {
      for (const question of body.questions) {
        try {
          const q = await findOrCreateSurveyQuestion(
            { ...question, survey_id: survey.id },
            user
          );

          if (question.options && question.options.length) {
            for (const option of question.options) {
              await findOrCreateSurveyQuestionOption(
                { ...option, question_id: q.id, survey_id: survey.id },
                user
              );
            }
          }
        } catch (err) {
          console.log(err);
          data.is_error = true;
          data.message = "Internal Server Error";
          break;
        }
      }
    }
    data.body = survey;
  } catch (err) {
    console.log(err);
    data.is_error = true;
    data.message = "Internal Server Error";
  }
  if (data.is_error) return { code: 500, error: data.message };
  return { code: 200, body: data.body };
};

// Delete a survey with the specified id in the request
export const deleteFn = async ({ id }) => {
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
export const findQuestionResponsesBySurveyId = async ({ id }) => {
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
export const findLoggedInUserSurveys = async ({ user }) => {
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
