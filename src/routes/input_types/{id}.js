const {
  delete: deleteInputType,
  findById,
  update,
} = require("../../controllers/survey_input_types.controller");
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
  const response = await deleteInputType({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Input type",
  operationId: "inputType",
  tags: ["Input Types"],
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
      description: "Input type",
    },
  },
};

put.apiDoc = {
  summary: "Update Input type",
  operationId: "updateInputType",
  tags: ["Input Types"],
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
      description: "Input type",
    },
  },
};

deleteFn.apiDoc = {
  summary: "Delete Input type",
  operationId: "deleteInputType",
  tags: ["Input Types"],
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
      description: "Input type deleted",
    },
  },
};

module.exports = { GET: [authenticateToken, get], DELETE: [authenticateToken, deleteFn], PUT: [authenticateToken, put] };
