import {
  deleteFn as deleteOption,
  findById,
  update,
} from "../../controllers/survey_options.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(req, res) {
  const response = await findById({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

async function put(req, res) {
  const response = await update({ id: req.params.id, body: req.body });

  res.status(response.code).json(response.error ?? response.body);
}

async function deleteFn(req, res) {
  const response = await deleteOption({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Input Options",
  operationId: "inputOption",
  tags: ["Input Options"],
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
      description: "Input option",
    },
  },
};

put.apiDoc = {
  summary: "Update Input option",
  operationId: "updateInputOption",
  tags: ["Input Options"],
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
          label: {
            type: "string",
          },
        },
      },
    },
  ],
  responses: {
    200: {
      description: "Input option",
    },
  },
};

deleteFn.apiDoc = {
  summary: "Delete Input Option",
  operationId: "deleteInputOption",
  tags: ["Input Options"],
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
      description: "Input option deleted",
    },
  },
};

export default {
  GET: [authenticateToken, get],
  DELETE: [authenticateToken, deleteFn],
  PUT: [authenticateToken, put],
};
