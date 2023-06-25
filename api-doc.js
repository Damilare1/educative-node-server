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
  paths: {},
};
