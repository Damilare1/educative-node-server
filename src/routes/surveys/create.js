import { createSurveyBulkCreateQuestionsOptions } from "../../controllers/surveys.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function post(req, res) {
  const { body, user } = req;
  const response = await createSurveyBulkCreateQuestionsOptions({ body, user });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Create Survey",
  operationId: "createSurvey",
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
        required: ['survey_name','survey_description']
      },
    },
  ],
  responses: {
    200: {
      description: "Survey",
    },
  },
};

export default { POST: [authenticateToken, post] };
