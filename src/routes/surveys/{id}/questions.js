import {
  findAllSurveyQuestionsBySurveyId,
} from "../../../controllers/surveys.controller.js";
async function get(req, res) {
  const response = await findAllSurveyQuestionsBySurveyId({
    id: req.params.id,
  });

  res.status(response.code).json(response.error ?? response.body);
}

get.apiDoc = {
  summary: "Get Survey Questions",
  operationId: "getSurveyQuestions",
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

export default { GET: get };
