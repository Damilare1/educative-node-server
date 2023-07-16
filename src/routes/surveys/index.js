import { Router } from "express"
import {
  findAll,
  updateOrCreateSurvey,
  createSurveyBulkCreateQuestionsOptions,
} from "../../controllers/surveys.controller.js";
import authenticateToken from "../../middleware/auth.js";
import SurveyAdmin from './admin/index.js';
import SurveyId from './{id}/index.js'
const router = Router();
router.use('/admin', SurveyAdmin)
router.use('/:id', SurveyId)

router.get("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Get All Surveys'
  // #swagger.operationId = 'getSurveys'
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
  const response = await findAll();

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Multipurpose endpoint to create or update a survey, its corresponding questions, and options in one operation'
  // #swagger.operationId = 'createOrUpdateSurveys'

  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: "string"
    } 
  */
  /* #swagger.parameters['body'] = {
        in: 'body',
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
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                      },
                      question: {
                        type: "string",
                      },
                      input_type_id: {
                        type: "integer",
                      },
                      admin_id: {
                        type: "integer",
                      },
                      options: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "integer",
                            },
                            label: {
                              type: "string",
                            },
                            question_id: {
                              type: "integer",
                            },
                            admin_id: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["survey_name", "survey_description", "is_active"],
            }
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Surveys',
    } 
  */
  const { body, user } = request;
  const response = await updateOrCreateSurvey({ body, user });

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/create", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Multipurpose endpoint to create or update a survey, its corresponding questions, and options in one operation'
  // #swagger.operationId = 'createOrUpdateSurveys'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: "string"
    } 
  */
  /* #swagger.parameters['body'] = {
        in: 'body',
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
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                      },
                      question: {
                        type: "string",
                      },
                      input_type_id: {
                        type: "integer",
                      },
                      admin_id: {
                        type: "integer",
                      },
                      options: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "integer",
                            },
                            label: {
                              type: "string",
                            },
                            question_id: {
                              type: "integer",
                            },
                            admin_id: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              required: ["survey_name", "survey_description"],
            }
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Surveys',
    } 
  */
  const { body, user } = request;
  const response = await createSurveyBulkCreateQuestionsOptions({ body, user });

  res.status(response.code).json(response.error ?? response.body);
});


export default router