import { Router } from "express";
import {
  findById,
  update,
  deleteFn as deleteSurvey,
  findAllSurveyQuestionsBySurveyId,
  findQuestionResponsesBySurveyId,
} from "../../../controllers/surveys.controller.js";
import authenticateToken from "../../../middleware/auth.js";

const router = Router();
router.get("/questions", async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Get Survey Questions'
  // #swagger.operationId = 'getSurveyQuestions'
  /* #swagger.parameters['id] = {
      in: "path",
      required: true,
      type: "integer",
    }

  /* #swagger.responses[200] = {
        description: 'Surveys',
    } 
  */
  const response = await findAllSurveyQuestionsBySurveyId({
    id: request.params.id,
  });
  res.status(response.code).json(response.error ?? response.body);
});

router.get("/responses", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Get Survey Responses'
  // #swagger.operationId = 'getSurveyResponses'
  /* #swagger.parameters['id] = {
      in: "path",
      required: true,
      type: "integer",
    }
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: "string"
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Surveys',
    } 
  */
  const response = await findQuestionResponsesBySurveyId({
    id: request.params.id,
    user: request.user,
  });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/:id", async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Get Survey'
  // #swagger.operationId = 'getSurvey'
  /* #swagger.parameters['id'] = {
      in: "path",
      required: true,
      type: "number",
    },
  */

  /* #swagger.responses[200] = {
        description: 'Surveys',
    } 
  */
  const response = await findById({ id: request.params.id });

  res.status(response.code).json(response.error ?? response.body);
});

router.put("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Update specific survey'
  // #swagger.operationId = 'updateSurveys'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: "string"
    } 
  */
  /* #swagger.parameters['id'] = {
      in: "path",
      required: true,
      type: "number",
    },
  */
  /* #swagger.parameters['body'] = {
      in: "body",
      required: true,
      '@schema': {
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
    },,
  */
  /* #swagger.responses[200] = {
        description: 'Surveys',
    } 
  */
  const {
    params: { id },
    body,
    user,
  } = request;
  const response = await update({ id, body, user });

  res.status(response.code).json(response.error ?? response.body);
});

router.delete("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Delete Survey'
  // #swagger.operationId = 'deleteSurvey'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: "string"
    } 
  */
  /* #swagger.parameters['id'] = {
      in: "path",
      required: true,
      type: "number",
    },
  */

  /* #swagger.responses[200] = {
        description: 'Survey deleted',
    } 
  */
  const response = await deleteSurvey({ id: request.params.id });

  res.status(response.code).json(response.error ?? response.body);
});
export default router;
