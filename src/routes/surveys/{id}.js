import {
  deleteFn as deleteSurvey,
  findById,
  update
} from "../../controllers/surveys.controller.js";
import authenticateToken from "../../middleware/auth.js";

async function get(req, res) {
  const {
    params: { id },
  } = req;
  const response = await findById({ id });

  res.status(response.code).json(response.error ?? response.body);
}

async function put(req, res) {
  const {
    params: { id },
    body,
    user,
  } = req;
  const response = await update({ id, body, user });

  res.status(response.code).json(response.error ?? response.body);
}

async function post(req, res) {
  const {
    params: { id },
    body,
    user,
  } = req;
  const response = await updateOrCreateSurvey({ id, body, user });

  res.status(response.code).json(response.error ?? response.body);
}

async function deleteFn(req, res) {
  const response = await deleteSurvey({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Survey",
  operationId: "getSurvey",
  tags: ["Surveys"],
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      type: "integer",
    },
  ],
  responses: {
    200: {
      description: "Survey",
    },
  },
};

put.apiDoc = {
  summary: "Update Survey",
  operationId: "updateSurvey",
  tags: ["Surveys"],
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
          survey_name: {
            type: "string",
          },
          survey_description: {
            type: "string",
          },
          is_active: {
            type: "boolean",
          },
        },
      },
    },
  ],
  responses: {
    200: {
      description: "Survey",
    },
  },
};

deleteFn.apiDoc = {
  summary: "Delete Survey",
  operationId: "deleteSurvey",
  tags: ["Surveys"],
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
      description: "Survey deleted",
    },
  },
};

export default {
  GET: get,
  DELETE: [authenticateToken, deleteFn],
  PUT: [authenticateToken, put],
};
