const auth = require("../middleware/auth");
const surveys = require("../controllers/surveys.controller.js");

module.exports = (app) => {
  var router = require("express").Router();
  // Create a new Survey
  router.post("/", auth, surveys.create);

  // Retrieve all Survey
  // router.get("/", surveys.findAll);

  // Retrieve Survey by id
  router.get("/:id", surveys.findById);

  // Retrieve all responses to questions for a particular survey
  router.get("/:id/responses", auth, surveys.findQuestionResponsesBySurveyId);

  // Retrieve all questions for a particular survey
  router.get("/:id/questions", surveys.findAllSurveyQuestionsBySurveyId);

  // Update a Survey with id
  router.put("/:id", auth, surveys.update);

  // Delete a Survey with id
  router.delete("/:id", auth, surveys.delete);

  app.use("/api/surveys", router);
};
