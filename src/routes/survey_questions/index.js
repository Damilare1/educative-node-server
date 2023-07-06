import {
  findAll,
  deleteMultiple,
} from "../../controllers/survey_questions.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(req, res) {
  const { user } = req;
  const response = await findAll({ user });

  res.status(response.code).json(response.error ?? response.body);
}

async function post(req, res) {
  const {
    user,
    body: { ids: idArr },
  } = req;
  const response = await deleteMultiple({ idArr, user });

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

post.apiDoc = {
  summary: "Delete Questions with IDs",
  operationId: "deleteMultipleQuestions",
  tags: ["Questions"],
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
          ids: {
            type: "array",
            items: {
              type: "number",
            },
          },
        },
        required: ["ids"],
      },
    },
  ],
  responses: {
    200: {
      description: "Questions",
    },
  },
};

export default { GET: [authenticateToken, get], POST: [authenticateToken, post] };
