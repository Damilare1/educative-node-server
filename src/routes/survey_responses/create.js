import { create } from "../../controllers/survey_responses.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function post(req, res) {
  const { body, user } = req;
  const response = await create({ body, user });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Create Response",
  operationId: "createResponse",
  tags: ["Responses"],
  parameters: [
    {
      name: "body",
      in: "body",
      required: true,
      schema: {
        type: "object",
        properties: {
          responses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                survey_id: {
                  type: "number",
                },
                option_id: {
                  type: "number",
                },
                question_id: {
                  type: "number",
                }
              }
            }
          }
        },
        required: ["responses"],
      },
    },
  ],
  responses: {
    200: {
      description: "Response",
    },
  },
};

export default { POST: post };
