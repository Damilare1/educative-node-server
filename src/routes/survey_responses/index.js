import { Router } from "express";
import {
  findAll,
  deleteFn as deleteResponse,
  findById,
  update,
  create,
} from "../../controllers/survey_responses.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router();
router.get("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Responses']
  // #swagger.summary = 'Get All Responses'
  // #swagger.operationId = 'getResponses'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: "string"
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Responses',
    } 
  */
  const response = await findAll({ user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/create", async (request, res) => {
  // #swagger.tags = ['Responses']
  // #swagger.summary = 'Create Responses'
  // #swagger.operationId = 'createResponses'

  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
              type: "object",
              properties: {
                responses: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      survey_id: {
                        type: "number",
                      },
                      option_id: {
                        type: "number",
                      },
                      question_id: {
                        type: "number",
                      },
                    },
                  },
                },
              },
              required: ["responses"],
            },
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Responses',
    } 
  */
  const response = await create({ user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Responses']
  // #swagger.summary = 'Get Response'
  // #swagger.operationId = 'getResponse'
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
        description: 'Responses',
    } 
  */
  const response = await findById({ id: request.params.id, user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

router.put("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Responses']
  // #swagger.summary = 'Update Response'
  // #swagger.operationId = 'updateResponse'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer'
    } 
  */
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
              type: "object",
              properties: {
                response: {
                  type: "string",
                },
              },
              required: ["response"],
            },
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Responses',
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
  // #swagger.tags = ['Responses']
  // #swagger.summary = 'Delete Response'
  // #swagger.operationId = 'deleteResponse'
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
        description: 'Responses',
    } 
  */
  const response = await deleteResponse({ id: request.params.id, user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

export default router;
