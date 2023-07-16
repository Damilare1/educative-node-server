import { Router } from "express";
import {
  deleteFn as deleteOption,
  findById,
  update,
  create,
  findAll,
} from "../../controllers/survey_options.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router()
router.get("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Options']
  // #swagger.summary = 'Get Input Options'
  // #swagger.operationId = 'inputOptions'
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
        description: 'Input option',
    } 
  */
  const response = await findById({ id: request.params.id });

  res.status(response.code).json(response.error ?? response.body);
});

router.put("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Options']
  // #swagger.summary = 'Update Input Options'
  // #swagger.operationId = 'updateInputOption'
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
                label: {
                  type: "string",
                },
              },
              required: ["label"],
        }
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Input option',
    } 
  */
  const response = await update({ id: request.params.id, body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

router.delete("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Options']
  // #swagger.summary = 'Update Input Options'
  // #swagger.operationId = 'updateInputOption'
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

  /* #swagger.responses[200] = {
        description: 'Input option deleted',
    } 
  */
  const response = await deleteOption({ id: request.params.id });

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/create", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Options']
  // #swagger.summary = 'Create Input Options'
  // #swagger.operationId = 'createInputOption'
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
                label: {
                  type: "string",
                },
              },
              required: ["label"],
            },
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Input option',
    } 
  */
  const response = await create({ body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Options']
  // #swagger.summary = 'Get Input Options'
  // #swagger.operationId = 'getInputOptions'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Input option',
    } 
  */
  const response = await findAll({ body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

export default router
