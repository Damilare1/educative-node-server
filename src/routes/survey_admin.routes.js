const admin = require("../controllers/survey_admin.controller");
const auth = require("../middleware/auth");

module.exports = (app) => {
  const router = require("express").Router();

  // Admin sign up
  router.post("/signup", admin.signup);

  // Login admin
  router.post("/login", admin.login);

  // Update admin
  router.put("/", admin.update);

  router.get("/me", auth, admin.getuser);

  app.use("/api/admin", router);
};
