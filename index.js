import express from 'express'
import { initialize } from 'express-openapi'
import { serve, setup } from 'swagger-ui-express'
import { session_secret } from './config/config.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import ApiDoc from './api-doc.js'
import { serverPort as port } from './config/config.js'

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true
}));
// simple route
app.get("/", (_, res) => {
  res.json({ message: "Welcome to the survey API." });
});

initialize({
  app,
  apiDoc: ApiDoc,
  paths: './src/routes',
  errorMiddleware: (err, _, res, __) => {
    res.status(err.status || 500).json(err);
  },
  errorTransformer: (err) => {
    return {
      message: err.message,
      location: err.location,
      field: err.path
    }
  },
});

app.use(
  "/documentation",
  serve,
  setup(null, {
    swaggerOptions: {
      url: `http://localhost:${port}/api/api-docs`,
    },
  })
);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});