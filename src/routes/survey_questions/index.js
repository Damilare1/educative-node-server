import { Router } from "express";
import {
  findAll,
  deleteMultiple,
  deleteFn as deleteQuestion,
  findById,
  update,
  create,
} from "../../controllers/survey_questions.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router();
router.get("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Questions']
  // #swagger.summary = 'Get All Questions'
  // #swagger.operationId = 'getQuestions'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Questions',
    } 
  */
  const response = await findAll({ user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Questions']
  // #swagger.summary = 'Delete Questions with IDs'
  // #swagger.operationId = 'deleteMultipleQuestions'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
            type: "object",
              properties: {
                ids: {
                  type: "array",
                  items: {
                    type: "number",
                  },
                },
              },
              required: ["ids"],   
        },
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Questions',
    } 
  */
  const {
    user,
    body: { ids: idArr },
  } = request;
  const response = await deleteMultiple({ idArr, user });

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/create", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Questions']
  // #swagger.summary = 'Create Question'
  // #swagger.operationId = 'createQuestion'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
          type: "object",
              properties: {
                question: {
                  type: "string",
                },
                survey_id: {
                  type: "number",
                },
              },
              required: ["question", "survey_id"],
        }
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Questions',
    } 
  */

  const response = await create({ body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Questions']
  // #swagger.summary = 'Get Question'
  // #swagger.operationId = 'getQuestion'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'number'
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Questions',
    } 
  */
  const response = await findById({ id: request.params.id, user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

router.put("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Questions']
  // #swagger.summary = 'Update Question'
  // #swagger.operationId = 'updateQuestion'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'number'
    } 
  */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
              type: "object",
              properties: {
                question: {
                  type: "string",
                },
              },
              required: ["question"],
            },
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Questions',
    } 
  */
  const response = await update({
    id: request.params.id,
    body: request.body,
    user: request.user,
  });

  res.status(response.code).json(response.error ?? response.body);
});

router.delete("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Questions']
  // #swagger.summary = 'Delete Question'
  // #swagger.operationId = 'deleteQuestion'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'number'
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Questions',
    } 
  */
  const response = await deleteQuestion({ id: request.params.id, user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

export default router
