const questions = require("../controllers/survey_questions.controller");

module.exports = (app) => {
  var router = require("express").Router();
  // Create a new Question
  router.post("/", questions.create);

  // Retrieve all Question
  router.get("/", questions.findAll);

  // Retrieve all Question
  router.get("/:id", questions.findById);

  // Update a Question with id
  router.put("/:id", questions.update);

  // Delete a Question with id
  router.delete("/:id", questions.delete);

  app.use("/api/questions", router);
};
