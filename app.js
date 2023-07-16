import express from "express";
import { serve, setup } from "swagger-ui-express";
import cookieParser from "cookie-parser";
import session from "express-session";
import ApiDoc from "./api-doc.json" assert { type: "json" };;
import { session_secret } from "./config/config.js";
import router from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
  })
);
// simple route
app.get("/", (_, res) => {
  res.redirect("/documentation");
});

app.get("/api/api-docs", (_, res) => {
  res.json(ApiDoc);
});
app.use('/api', router)

app.use(
  "/documentation",
  serve,
  setup(ApiDoc)
);

export default app;
