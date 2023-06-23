import { findAll } from "../../controllers/surveys.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Surveys",
  operationId: "getSurveys",
  tags: ["Surveys"],
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
      description: "Surveys",
    },
  },
};

export default { GET: [authenticateToken, get] };
