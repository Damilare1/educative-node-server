const { findAll } = require("../../controllers/survey_options.controller");

async function GET(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

GET.apiDoc = {
  summary: "Get All Input options",
  operationId: "getInputOptions",
  tags: ["Input Options"],
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
      description: "Input options",
    },
  },
};

module.exports = { GET };
