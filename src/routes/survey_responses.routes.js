const responses = require("../controllers/survey_responses.controller");

module.exports = app => {
    var router = require("express").Router();
    // Create a new Survey
    router.post("/", responses.create);

    // Retrieve all Survey
    router.get("/", responses.findAll);

    // Retrieve all Survey
    router.get("/:id", responses.findById);

    // Update a Survey with id
    router.put("/:id", responses.update);

    // Delete a Survey with id
    router.delete("/:id", responses.delete);

    app.use('/api/responses', router);
};