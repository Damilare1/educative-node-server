import { findAll } from "../../controllers/survey_input_types.controller.js";
import authenticateToken from "../../middleware/auth.js";

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

export default { GET: [authenticateToken, get] };
