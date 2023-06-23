const { getuser } = require("../../controllers/survey_admin.controller.js");
const authenticateToken = require("../../middleware/auth.js");

async function get(req, res) {
  const response = await getuser(req.user);

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Admin User",
  operationId: "adminUser",
  tags: ["Admin"],
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
      description: "User credential details",
    },
  },
};

module.exports = { GET: [authenticateToken, get] };
