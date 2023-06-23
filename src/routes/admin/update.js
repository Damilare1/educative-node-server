import { update } from "../../controllers/survey_admin.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function put(req, res) {
  const response = await update(req.body);

  res.status(response.code).json(response.error ?? response.body);
}

put.apiDoc = {
  summary: "Admin Update",
  operationId: "adminUpdate",
  tags: ["Admin"],
  parameters: [
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
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
      description: "User credential updated",
    },
  },
};

export default { PUT: [authenticateToken, put] };
