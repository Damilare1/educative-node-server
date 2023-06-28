import {
  deleteFn as deleteQuestion,
  findById,
  update,
} from "../../controllers/survey_questions.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(req, res) {
  const { params: { id }, user } = req;
  const response = await findById({ id, user });

  res.status(response.code).json(response.error ?? response.body);
}

async function put(req, res) {
  const { params: { id }, body, user } = req;
  const response = await update({ id, body, user });

  res.status(response.code).json(response.error ?? response.body);
}

async function deleteFn(req, res) {
  const { params: { id }, user } = req;
  const response = await deleteQuestion({ id, user });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Question",
  operationId: "questionType",
  tags: ["Questions"],
  parameters: [
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
    {
      in: "path",
      name: "id",
      required: true,
      type: "integer",
    },
  ],
  responses: {
    200: {
      description: "Question",
    },
  },
};

put.apiDoc = {
  summary: "Update Question",
  operationId: "updateQuestion",
  tags: ["Questions"],
  parameters: [
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
    {
      in: "path",
      name: "id",
      required: true,
      type: "integer",
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
        },
        required: ["question"],
      },
    },
  ],
  responses: {
    200: {
      description: "Question",
    },
  },
};

deleteFn.apiDoc = {
  summary: "Delete Question",
  operationId: "deleteQuestion",
  tags: ["Questions"],
  parameters: [
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
    {
      in: "path",
      name: "id",
      required: true,
      type: "integer",
    },
  ],
  responses: {
    200: {
      description: "Question deleted",
    },
  },
};

export default { GET: [authenticateToken, get], DELETE: [authenticateToken, deleteFn], PUT: [authenticateToken, put] };
