import { create } from "../../controllers/surveys.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function post(req, res) {
  const { body, user } = req;
  const response = await create({ body, user });

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
        },
        required: ['survey_name','survey_description','is_active']
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
