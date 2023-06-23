const { create } = require("../../controllers/surveys.controller");
const authenticateToken = require("../../middleware/auth");

async function post(req, res) {
  const response = await create({ body: req.body });

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
      },
    },
  ],
  responses: {
    200: {
      description: "Survey",
    },
  },
};

module.exports = { POST: [authenticateToken, post] };
