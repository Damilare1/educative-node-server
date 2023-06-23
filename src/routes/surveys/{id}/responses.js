import {
  findQuestionResponsesBySurveyId,
} from "../../../controllers/surveys.controller.js";
import authenticateToken from "../../../middleware/auth.js";

async function get(req, res) {
  const response = await findQuestionResponsesBySurveyId({ id: req.params.id });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Survey Responses",
  operationId: "getSurveyResponses",
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
      description: "Survey",
    },
  },
};



export default { GET: [authenticateToken, get] };
