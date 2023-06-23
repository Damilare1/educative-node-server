const { create } = require("../../controllers/survey_responses.controller");
const authenticateToken = require("../../middleware/auth");

async function post(req, res) {
  const response = await create({ body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Create Response",
  operationId: "createResponse",
  tags: ["Responses"],
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
          option_id: {
            type: "number",
          }
        },
      },
    },
  ],
  responses: {
    200: {
      description: "Response",
    },
  },
};

module.exports = { POST: [authenticateToken, post] };
