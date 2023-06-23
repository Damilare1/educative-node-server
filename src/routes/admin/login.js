const { login } = require("../../controllers/survey_admin.controller.js");

async function POST(req, res) {
  const response = await login({...req.body, sessionId: req.session.id });

  res.status(response.code).json(response.error ?? response.body);
}

POST.apiDoc = {
  summary: "Admin login",
  operationId: "adminLogin",
  tags: ["Admin"],
  parameters: [
    {
      name: "body",
      in: "body",
      required: true,
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
    },
  ],
  responses: {
    200: {
      description: "User credential details",
    },
  },
};

module.exports = { POST };
