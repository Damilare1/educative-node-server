import { Router } from "express";
import { login, signup, getuser, update } from "../../controllers/survey_admin.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router();
router.post("/login", async (request, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'Admin Login'
  // #swagger.operationId = 'adminLogin'
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
              required: ["email", "password"],
            }
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Login successful.',
    } 
  */
  const response = await login({ ...request.body, sessionId: request.session.id });

  res.status(response.code).json(response.error ?? response.body);
});

router.get("/me", authenticateToken, async (request, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'Admin User'
  // #swagger.operationId = 'adminUser'
  /* #swagger.parameters['authorization'] = {
        in: 'header',
        required: true,
        type: 'string'
    } 
  */
  /* #swagger.responses[200] = {
        description: 'User is authenticated.',
    } 
  */
  const response = await getuser(request.user);

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/signup", async (request, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'Admin Signup'
  // #swagger.operationId = 'adminSignup'
  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
              },
              required: ["email", "password", "username"],
            },
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Signup successful.',
    } 
  */
  const response = await signup(request.body);

  res.status(response.code).json(response.error ?? response.body);
});

router.post("/update", async (request, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'Admin Update'
  // #swagger.operationId = 'adminUpdate'
 /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        '@schema': {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                username: {
                  type: "string",
                },
              },
              required: ["email", "password", "username"],
            },
    } 
  */
  /* #swagger.responses[200] = {
        description: 'Update successful.',
    } 
  */
  const response = await update(request.body);

  res.status(response.code).json(response.error ?? response.body);
});

export default router