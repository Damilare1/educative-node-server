const { findAll } = require("../../controllers/survey_questions.controller");
const authenticateToken = require("../../middleware/auth");

async function get(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Questions",
  operationId: "getQuestions",
  tags: ["Questions"],
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
      description: "Questions",
    },
  },
};

module.exports = { GET: [authenticateToken, get] };
