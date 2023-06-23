const { findAll } = require("../../controllers/survey_input_types.controller");
const authenticateToken = require("../../middleware/auth");

async function get(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Input types",
  operationId: "getInputTypes",
  tags: ["Input Types"],
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
      description: "Input types",
    },
  },
};

module.exports = { GET: [authenticateToken, get] };
