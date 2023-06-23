const { findAll } = require("../../controllers/surveys.controller");
const authenticateToken = require("../../middleware/auth");

async function get(_, res) {
  const response = await findAll();

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

module.exports = { GET: [authenticateToken, get] };
