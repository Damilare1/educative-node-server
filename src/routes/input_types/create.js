const { create } = require("../../controllers/survey_input_types.controller");
const authenticateToken = require("../../middleware/auth");

async function post(req, res) {
  const response = await create({ body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Get Input type",
  operationId: "createInputType",
  tags: ["Input Types"],
  parameters: [
    {
      in: 'header',
      name: 'authorization',
      required: true,
      type: 'string',
    },
    {
      name: "body",
      in: "body",
      required: true,
      schema: {
        type: "object",
        properties: {
          label: {
            type: "string",
          },
        },
      },
    },
  ],
  responses: {
    200: {
      description: "Input type",
    },
  },
};

module.exports = { POST: [authenticateToken, post] };
