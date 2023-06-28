import { create } from "../../controllers/survey_input_types.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function post(req, res) {
  const response = await create({ body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

post.apiDoc = {
  summary: "Get Input type",
  operationId: "createInputType",
  tags: ["Input Types"],
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
      description: "Input type",
    },
  },
};

export default { POST: [authenticateToken, post] };
