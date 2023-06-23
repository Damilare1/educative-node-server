const { signup } = require("../../controllers/survey_admin.controller.js");

async function POST(req, res) {
  const response = await signup(req.body);

  res.status(response.code).json(response.error ?? response.body);
}

POST.apiDoc = {
  summary: "Admin Signup",
  operationId: "adminSignup",
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
          username: {
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
