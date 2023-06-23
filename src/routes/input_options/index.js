import { findAll } from "../../controllers/survey_options.controller.js";

async function GET(_, res) {
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
}

GET.apiDoc = {
  summary: "Get All Input options",
  operationId: "getInputOptions",
  tags: ["Input Options"],
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
      description: "Input options",
    },
  },
};

export default { GET };
