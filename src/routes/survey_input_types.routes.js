const inputTypes = require("../controllers/survey_input_types.controller");

module.exports = (app) => {
  var router = require("express").Router();
  // Create a new Input Type
  router.post("/", inputTypes.create);

  // Retrieve all Input Type
  router.get("/", inputTypes.findAll);

  // Retrieve all Input Type
  router.get("/:id", inputTypes.findById);

  // Update a Input Type with id
  router.put("/:id", inputTypes.update);

  // Delete a Input Type with id
  router.delete("/:id", inputTypes.delete);

  app.use("/api/inputTypes", router);
};
