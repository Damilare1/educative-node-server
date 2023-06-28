import {
  findAll,
  updateOrCreateSurvey,
} from "../../controllers/surveys.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

async function post(req, res) {
  const { body, user } = req;
  const response = await updateOrCreateSurvey({ body, user });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Surveys",
  operationId: "getSurveys",
  tags: ["Surveys"],
  parameters: [
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
  ],
  responses: {
    200: {
      description: "Surveys",
    },
  },
};

post.apiDoc = {
  summary:
    "Multipurpose endpoint to create or update a survey, its corresponding questions, and options in one operation",
  operationId: "createOrUpdateSurveys",
  tags: ["Surveys"],
  parameters: [
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
    {
      name: "body",
      in: "body",
      required: true,
      schema: {
        type: "object",
        properties: {
          survey_name: {
            type: "string",
          },
          survey_description: {
            type: "string",
          },
          is_active: {
            type: "boolean",
          },
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                question: {
                  type: "string",
                },
                input_type_id: {
                  type: "integer",
                },
                admin_id: {
                  type: "integer",
                },
                options: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      label: {
                        type: "string",
                      },
                      question_id: {
                        type: "integer",
                      },
                      admin_id: {
                        type: "integer",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        required: ["survey_name", "survey_description", "is_active"],
      },
    },
  ],
  responses: {
    200: {
      description: "Surveys",
    },
  },
};

export default {
  GET: [authenticateToken, get],
  POST: [authenticateToken, post],
};
