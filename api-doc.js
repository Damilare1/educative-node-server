export default {
  swagger: "2.0",
  basePath: "/api",
  info: {
    title: "Survey Node API",
    version: "1.0.0",
  },
  definitions: {
    Survey: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        survey_name: {
          type: "string",
        },
        survey_description: {
          type: "string",
        },
        is_active: {
          type: "boolean",
        },
        start_date: {
          type: "string",
        },
        end_date: {
          type: "string",
        },
        admin_id: {
          type: "number",
        },
      },
      required: ["id", "survey_name", "survey_description"],
    },
    Survey_Admin: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        email: {
          type: "string",
        },
        username: {
          type: "string",
        },
        password: {
          type: "boolean",
        },
      },
      required: ["email", "password"],
    },
    Survey_Responses: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        option_id: {
          type: "number",
        },
      },
      required: ["id", "option_id"],
    },
    Survey_Questions: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        question: {
          type: "string",
        },
        survey_id: {
          type: "number",
        },
      },
      required: ["id", "question", "survey_id"],
    },
    Survey_Options: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        question_id: {
          type: "number",
        },
        label: {
          type: "string",
        },
      },
      required: ["id", "label", "question_id"],
    },
    Survey_Input_Types: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        label: {
          type: "string",
        },
      },
      required: ["id", "label"],
    },
  },
  paths: {
    "/surveys/create": {
      parameters: [],
      post: {
        summary: "Create Survey",
        operationId: "createSurvey",
        tags: ["Surveys"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
            },
          },
        ],
        responses: {
          200: {
            description: "Survey",
          },
        },
      },
    },
    "/surveys/admin/": {
      parameters: [],
      get: {
        summary: "Get All Surveys create by Admin",
        operationId: "getAdminSurveys",
        tags: ["Surveys"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Surveys",
          },
        },
      },
    },
    "/surveys/": {
      parameters: [],
      get: {
        summary: "Get All Surveys",
        operationId: "getSurveys",
        tags: ["Surveys"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Surveys",
          },
        },
      },
      post: {
        summary:
          "Multipurpose endpoint to create or update a survey, its corresponding questions, and options in one operation",
        operationId: "createOrUpdateSurveys",
        tags: ["Surveys"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
            },
          },
        ],
        responses: {
          200: {
            description: "Surveys",
          },
        },
      },
    },
    "/survey_responses/create": {
      parameters: [],
      post: {
        summary: "Create Response",
        operationId: "createResponse",
        tags: ["Responses"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
          },
        ],
        responses: {
          200: {
            description: "Response",
          },
        },
      },
    },
    "/survey_responses/": {
      parameters: [],
      get: {
        summary: "Get All Responses",
        operationId: "getResponses",
        tags: ["Responses"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Responses",
          },
        },
      },
    },
    "/survey_questions/create": {
      parameters: [],
      post: {
        summary: "Create Question",
        operationId: "createQuestion",
        tags: ["Questions"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
            },
          },
        ],
        responses: {
          200: {
            description: "Question",
          },
        },
      },
    },
    "/survey_questions/": {
      parameters: [],
      get: {
        summary: "Get All Questions",
        operationId: "getQuestions",
        tags: ["Questions"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Questions",
          },
        },
      },
      post: {
        summary: "Delete Questions with IDs",
        operationId: "deleteMultipleQuestions",
        tags: ["Questions"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
          },
        ],
        responses: {
          200: {
            description: "Questions",
          },
        },
      },
    },
    "/input_types/create": {
      parameters: [],
      post: {
        summary: "Get Input type",
        operationId: "createInputType",
        tags: ["Input Types"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
              },
              required: ["label"],
            },
          },
        ],
        responses: {
          200: {
            description: "Input type",
          },
        },
      },
    },
    "/input_types/": {
      parameters: [],
      get: {
        summary: "Get All Input types",
        operationId: "getInputTypes",
        tags: ["Input Types"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Input types",
          },
        },
      },
    },
    "/input_options/create": {
      parameters: [],
      post: {
        summary: "Get Input option",
        operationId: "createInputOption",
        tags: ["Input Options"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
              },
              required: ["label"],
            },
          },
        ],
        responses: {
          200: {
            description: "Input option",
          },
        },
      },
    },
    "/input_options/": {
      parameters: [],
      get: {
        summary: "Get All Input options",
        operationId: "getInputOptions",
        tags: ["Input Options"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Input options",
          },
        },
      },
    },
    "/admin/update": {
      parameters: [],
      put: {
        summary: "Admin Update",
        operationId: "adminUpdate",
        tags: ["Admin"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
          },
        ],
        responses: {
          200: {
            description: "User credential updated",
          },
        },
      },
    },
    "/admin/signup": {
      parameters: [],
      post: {
        summary: "Admin Signup",
        operationId: "adminSignup",
        tags: ["Admin"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
          },
        ],
        responses: {
          200: {
            description: "User credential details",
          },
        },
      },
    },
    "/admin/me": {
      parameters: [],
      get: {
        summary: "Admin User",
        operationId: "adminUser",
        tags: ["Admin"],
        parameters: [
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "User credential details",
          },
        },
      },
    },
    "/admin/login": {
      parameters: [],
      post: {
        summary: "Admin login",
        operationId: "adminLogin",
        tags: ["Admin"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
            },
          },
        ],
        responses: {
          200: {
            description: "User credential details",
          },
        },
      },
    },
    "/surveys/admin/{id}": {
      parameters: [],
      get: {
        summary: "Get Single Survey create by Admin",
        operationId: "getSingleAdminSurvey",
        tags: ["Surveys"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            type: "integer",
          },
          {
            in: "header",
            name: "authorization",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Surveys",
          },
        },
      },
    },
    "/surveys/{id}/responses": {
      parameters: [],
      get: {
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
      },
    },
    "/surveys/{id}/questions": {
      parameters: [],
      get: {
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
      },
    },
    "/surveys/{id}": {
      parameters: [],
      get: {
        summary: "Get Survey",
        operationId: "getSurvey",
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
      },
      delete: {
        summary: "Delete Survey",
        operationId: "deleteSurvey",
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
            description: "Survey deleted",
          },
        },
      },
      put: {
        summary: "Update Survey",
        operationId: "updateSurvey",
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
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
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
          },
        ],
        responses: {
          200: {
            description: "Survey",
          },
        },
      },
    },
    "/survey_responses/{id}": {
      parameters: [],
      get: {
        summary: "Get Response",
        operationId: "getResponse",
        tags: ["Responses"],
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
            description: "Response",
          },
        },
      },
      delete: {
        summary: "Delete Response",
        operationId: "deleteResponse",
        tags: ["Responses"],
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
            description: "Response deleted",
          },
        },
      },
      put: {
        summary: "Update Response",
        operationId: "updateResponse",
        tags: ["Responses"],
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
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                },
              },
              required: ["response"],
            },
          },
        ],
        responses: {
          200: {
            description: "Response",
          },
        },
      },
    },
    "/survey_questions/{id}": {
      parameters: [],
      get: {
        summary: "Get Question",
        operationId: "questionType",
        tags: ["Questions"],
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
            description: "Question",
          },
        },
      },
      delete: {
        summary: "Delete Question",
        operationId: "deleteQuestion",
        tags: ["Questions"],
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
            description: "Question deleted",
          },
        },
      },
      put: {
        summary: "Update Question",
        operationId: "updateQuestion",
        tags: ["Questions"],
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
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                },
              },
              required: ["question"],
            },
          },
        ],
        responses: {
          200: {
            description: "Question",
          },
        },
      },
    },
    "/input_types/{id}": {
      parameters: [],
      get: {
        summary: "Get Input type",
        operationId: "inputType",
        tags: ["Input Types"],
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
            description: "Input type",
          },
        },
      },
      delete: {
        summary: "Delete Input type",
        operationId: "deleteInputType",
        tags: ["Input Types"],
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
            description: "Input type deleted",
          },
        },
      },
      put: {
        summary: "Update Input type",
        operationId: "updateInputType",
        tags: ["Input Types"],
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
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
              },
              required: ["label"],
            },
          },
        ],
        responses: {
          200: {
            description: "Input type",
          },
        },
      },
    },
    "/input_options/{id}": {
      parameters: [],
      get: {
        summary: "Get Input Options",
        operationId: "inputOption",
        tags: ["Input Options"],
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
            description: "Input option",
          },
        },
      },
      delete: {
        summary: "Delete Input Option",
        operationId: "deleteInputOption",
        tags: ["Input Options"],
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
            description: "Input option deleted",
          },
        },
      },
      put: {
        summary: "Update Input option",
        operationId: "updateInputOption",
        tags: ["Input Options"],
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
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                },
              },
              required: ["label"],
            },
          },
        ],
        responses: {
          200: {
            description: "Input option",
          },
        },
      },
    },
  },
};
