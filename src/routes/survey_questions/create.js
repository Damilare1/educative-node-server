import { create } from "../../controllers/survey_questions.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function post(req, res) {
  const response = await create({ body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Create Question",
  operationId: "createQuestion",
  tags: ["Questions"],
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
          question: {
            type: "string",
          },
          survey_id: {
            type: "number",
          }
        },
      },
    },
  ],
  responses: {
    200: {
      description: "Question",
    },
  },
};

export default { POST: [authenticateToken, post] };
