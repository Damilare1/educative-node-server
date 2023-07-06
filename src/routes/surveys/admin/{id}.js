import { findSurveyByIdAdmin } from "../../../controllers/surveys.controller.js";
import authenticateToken from "../../../middleware/auth.js";

async function get(req, res) {

  const response = await findSurveyByIdAdmin({ id: req.params.id, user: req.user });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Single Survey create by Admin",
  operationId: "getSingleAdminSurvey",
  tags: ["Surveys"],
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      type: "integer",
    },
    {
      in: "header",
      name: "authorization",
      required: true,
      type: "string",
    },
  ],
  responses: {
    200: {
      description: "Surveys",
    },
  },
};

export default {
  GET: [authenticateToken, get],
};
