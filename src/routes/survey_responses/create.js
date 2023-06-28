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
          question_id: {
            type: "number",
          },
          survey_id: {
            type: "number",
          },
          input_type_id: {
            type: "number",
          },
          option_id: {
            type: "number",
          },
        },
        required: ["question_id", "survey_id", "input_type_id", "option_id"],
      },
    },
  ],
  responses: {
    200: {
      description: "Response",
    },
  },
};

export default { POST: [authenticateToken, post] };
