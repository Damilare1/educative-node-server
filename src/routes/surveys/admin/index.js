import { Router } from "express"
import { findAllByAdmin, findSurveyByIdAdmin } from "../../../controllers/surveys.controller.js";
import authenticateToken from "../../../middleware/auth.js";
const router = Router();

router.get("/", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Get All Surveys created by Admin'
  // #swagger.operationId = 'getAdminSurveys'
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
  const response = await findAllByAdmin({ user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/:id", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Surveys']
  // #swagger.summary = 'Get Single Survey create by Admin'
  // #swagger.operationId = 'getSingleAdminSurvey'
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
    const response = await findSurveyByIdAdmin({ id: request.params.id, user: request.user });

  res.status(response.code).json(response.error ?? response.body);
});

export default router
