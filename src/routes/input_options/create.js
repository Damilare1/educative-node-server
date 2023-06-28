import { create } from "../../controllers/survey_options.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function post(req, res) {
  const response = await create({ body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Get Input option",
  operationId: "createInputOption",
  tags: ["Input Options"],
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
          label: {
            type: "string",
          },
        },
        required: ["label"],
      },
    },
  ],
  responses: {
    200: {
      description: "Input option",
    },
  },
};

export default { POST: [authenticateToken, post] };
