const express = require("express");
const { initialize } = require('express-openapi');
const { serve, setup } = require('swagger-ui-express');
const config = require("./config/config");
var cookieParser = require('cookie-parser');
var session = require('express-session')
const auth = require('./src/middleware/auth')
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

initialize({
  app,
  apiDoc: require("./api-doc"),
  paths: './src/routes'
});

app.use(
  "/api-documentation",
  serve,
  setup(null, {
    swaggerOptions: {
      url: `http://localhost:${port}/api-docs`,
    },
  })
);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});