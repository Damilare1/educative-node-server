const { findAll } = require("../../controllers/survey_responses.controller");
const authenticateToken = require("../../middleware/auth");

async function get(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Responses",
  operationId: "getResponses",
  tags: ["Responses"],
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
      description: "Responses",
    },
  },
};

module.exports = { GET: [authenticateToken, get] };
