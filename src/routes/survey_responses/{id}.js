const {
  delete: deleteResponse,
  findById,
  update,
} = require("../../controllers/survey_responses.controller");
const authenticateToken = require("../../middleware/auth");

async function get(req, res) {
  const response = await findById({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

async function put(req, res) {
  const response = await update({ id: req.params.id, body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

async function deleteFn(req, res) {
  const response = await deleteResponse({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Response",
  operationId: "getResponse",
  tags: ["Responses"],
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
      description: "Response",
    },
  },
};

put.apiDoc = {
  summary: "Update Response",
  operationId: "updateResponse",
  tags: ["Responses"],
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
          response: {
            type: "string",
          },
        },
      },
    },
  ],
  responses: {
    200: {
      description: "Response",
    },
  },
};

deleteFn.apiDoc = {
  summary: "Delete Response",
  operationId: "deleteResponse",
  tags: ["Responses"],
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
      description: "Response deleted",
    },
  },
};

module.exports = {
  GET: [authenticateToken, get],
  DELETE: [authenticateToken, deleteFn],
  PUT: [authenticateToken, put],
};
