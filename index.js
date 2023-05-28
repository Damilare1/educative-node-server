const express = require("express");
const surveys = require("./src/routes/surveys.routes");
const questions = require("./src/routes/survey_questions.routes");
const inputTypes = require("./src/routes/survey_input_types.routes");
const responses = require("./src/routes/survey_responses.routes");
const options = require("./src/routes/survey_options.routes");
const admins = require("./src/routes/survey_admin.routes");
const config = require("./config/config");
var cookieParser = require('cookie-parser');
var session = require('express-session')

const port = 8003;

var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true
}));
// simple route
app.get("/", (_, res) => {
  res.json({ message: "Welcome to the survey API." });
});

surveys(app);
questions(app);
inputTypes(app);
responses(app);
options(app);
admins(app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
