import { findAll } from "../../controllers/survey_questions.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Questions",
  operationId: "getQuestions",
  tags: ["Questions"],
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
      description: "Questions",
    },
  },
};

export default { GET: [authenticateToken, get] };
