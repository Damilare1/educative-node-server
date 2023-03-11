const express = require("express");
const surveys = require("./src/routes/surveys.routes");
const questions = require("./src/routes/survey_questions.routes");
const inputTypes = require("./src/routes/survey_input_types.routes");
const responses = require("./src/routes/survey_responses.routes");
const options = require("./src/routes/survey_options.routes");
const port = 8003;

var app = express();
app.use(express.json()) 
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to survey API." });
});

surveys(app);
questions(app);
inputTypes(app);
responses(app);
options(app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
