import { Op, Sequelize } from "sequelize";
import Surveys from "../models/survey.model.js";
import InputTypes from "../models/survey_input_types.model.js";
import Options from "../models/survey_options.model.js";
import Questions from "../models/survey_questions.model.js";
import Admin from "../models/survey_admin.model.js";

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

// Retrieve all Surveys by Admin from the database
export const findAllByAdmin = async ({ user }) => {
  try {
    const data = await Surveys.findAll({
      where: {
        admin_id: user.admin_id,
      },
      include: [
        {
          model: Admin,
          as: "author",
          attributes: ["username"],
        },
      ],
    });
    return { body: data, code: 200 };
  } catch (err) {
    console.log(err);
    return {
      error: {
        message:
          err.message || "Some error occurred while retrieving the survey.",
      },
      code: 500,
    };
  }
};

// Retrieve single Survey with the survey id belonging to an Admin from the database
export const findSurveyByIdAdmin = async ({ id, user }) => {
  try {
    const data = await Surveys.findOne({
      where: {
        id,
        admin_id: user.admin_id,
      },
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
    if (!data)
      return {
        error: {
          message: "Not found",
        },
        code: 404,
      };
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
    let data = {
      message: "Survey was updated successfully.",
    };
    if (body.questions && body.questions.length) {
      const unDeletedQuestions = body.questions
        .filter((q) => q.id)
        .map((q) => q.id);
      await Questions.destroy({
        where: {
          id: {
            [Op.notIn]: unDeletedQuestions,
          },
          admin_id: user.admin_id,
          survey_id: id,
        },
      });
      for (const question of body.questions) {
        try {
          const q = await findOrCreateSurveyQuestion(
            { ...question, survey_id: id },
            user
          );

          if (question.options && question.options.length) {
            const undeletedOptions = question.options
              .filter((op) => op.id)
              .map((op) => op.id);
            await Options.destroy({
              where: {
                id: {
                  [Op.notIn]: undeletedOptions,
                },
                admin_id: user.admin_id,
                question_id: q.id,
              },
            });
            for (const option of question.options) {
              await findOrCreateSurveyQuestionOption(
                { ...option, question_id: q.id, survey_id: id },
                user
              );
            }
          }
        } catch (err) {
          console.log(err);
          data = {};
          data.is_error = true;
          data.message = "Internal Server Error";
          break;
        }
      }
    }
    return { body: data, code: 200 };
  } catch (err) {
    console.log(err);

    return {
      error: {
        message: err.message || `Error updating Survey with id=${id}`,
      },
      code: 500,
    };
  }
};

export const createSurveyBulkCreateQuestionsOptions = async ({
  body,
  user,
}) => {
  try {
    const { questions, ...survey } = body;
    survey.admin_id = user.admin_id;
    const surveyModel = await Surveys.create(survey);

    if (questions && questions.length > 0) {
      for (const question of questions) {
        try {
          const { options, ...q } = question;
          const questionBody = {
            ...q,
            survey_id: surveyModel.id,
            admin_id: user.admin_id,
          };
          const questionModel = await Questions.create(questionBody);
          if (options && options.length > 0) {
            for (const option of options) {
              const optionsBody = {
                ...option,
                question_id: questionModel.id,
                admin_id: user.admin_id,
              };
              await Options.create(optionsBody);
            }
          }
        } catch (e) {
          console.log(e);
          const error = {};
          error.message = e.message ?? "Internal Server Error";
          return { error, code: 500 };
        }
      }
    }
    return { body: surveyModel.get({ plain: true }), code: 200 };
  } catch (e) {
    const error = {};
    error.message = e.message ?? "Internal Server Error";
    return { error, code: 500 };
  }
};
// Update a survey by the id in the request
export const updateOrCreateSurvey = async ({ body, user }) => {
  const data = {
    is_error: false,
  };
  try {
    const survey = await findOrCreateSurvey(body, user);
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
    console.log(err);
    return {
      error: {
        message: `Could not delete Survey with id=${id}`,
      },
      code: 500,
    };
  }
};

// Retrieve response metric for a particular survey
export const findQuestionResponsesBySurveyId = async ({ id, user }) => {
  try {
    const survey = await Surveys.findByPk(id);
    if (!survey) throw new Error(`Survey with id: ${id} does not exist`);
    const responses = await survey.getResponses({
      attributes: [
        'question_id',
        'option_id',
        [Sequelize.fn('COUNT', '*'), 'count']
      ],
      include: [{
        model: Questions,
        attributes: ['question'],
        where: {
          admin_id: user.admin_id
        },
      }, {
        model: Options,
        attributes: ['label']
      }],
      group: ["question_id","option_id"],
    })

    const data = {}
    let responseCount = 0
    for(const response of responses) {
      const { question_id, option_id, survey_question, survey_option, count } = response.get({plain: true})
      if( data[question_id] ){
        data[question_id].count += count,
        responseCount = data[question_id].count > responseCount ? data[question_id].count : responseCount
        data[question_id].options.push({...survey_option, option_id, question_id, count})
        continue;
      }
      data[question_id] = {...survey_question, question_id, count}
      data[question_id].options = []
      data[question_id].options.push({...survey_option, option_id, count})
      responseCount = count > responseCount ? count : responseCount
    }

    
    return { body: { data: Object.values(data), count: responseCount, ...survey.get({ plain: true }) }, code: 200 };
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
