const options = require("../controllers/survey_options.controller");

module.exports = app => {
    var router = require("express").Router();
    // Create a new Survey
    router.post("/", options.create);

    // Retrieve all Survey
    router.get("/", options.findAll);

    // Retrieve all Survey
    router.get("/:id", options.findById);

    // Update a Survey with id
    router.put("/:id", options.update);

    // Delete a Survey with id
    router.delete("/:id", options.delete);

    app.use('/api/options', router);
};