import { Router } from "express";
import {
  deleteFn as deleteType,
  findById,
  update,
  create,
  findAll,
} from "../../controllers/survey_input_types.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router();
router.get("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Types']
  // #swagger.summary = 'Get Input Types'
  // #swagger.operationId = 'inputTypes'
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
        description: 'Input type',
    } 
  */
  const response = await findById({ id: request.params.id });

  res.status(response.code).json(response.error ?? response.body);
});

router.put("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Types']
  // #swagger.summary = 'Update Input Types'
  // #swagger.operationId = 'updateInputType'
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
            },
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Input type',
    } 
  */
  const response = await update({ id: request.params.id, body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

router.delete("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Types']
  // #swagger.summary = 'Update Input Types'
  // #swagger.operationId = 'updateInputType'
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
        description: 'Input type deleted',
    } 
  */
  const response = await deleteType({ id: request.params.id });

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/create", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Types']
  // #swagger.summary = 'Create Input Types'
  // #swagger.operationId = 'createInputType'
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
        description: 'Input type',
    } 
  */
  const response = await create({ body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Input Types']
  // #swagger.summary = 'Get Input Types'
  // #swagger.operationId = 'getInputTypes'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */

  /* #swagger.responses[200] = {
        description: 'Input type',
    } 
  */
  const response = await findAll({ body: request.body });

  res.status(response.code).json(response.error ?? response.body);
});

export default router;
