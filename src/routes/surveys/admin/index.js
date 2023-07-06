import { findAllByAdmin } from "../../../controllers/surveys.controller.js";
import authenticateToken from "../../../middleware/auth.js";

async function get(req, res) {
  const response = await findAllByAdmin({ user: req.user });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get All Surveys create by Admin",
  operationId: "getAdminSurveys",
  tags: ["Surveys"],
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
      description: "Surveys",
    },
  },
};

export default {
  GET: [authenticateToken, get],
};
