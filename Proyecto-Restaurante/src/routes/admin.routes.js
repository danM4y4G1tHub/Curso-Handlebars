const express = require("express");
const { AuthController } = require("../controllers/Auth.controller");
const { logged } = require("../helpers/auth.helper");

const router = express.Router();

router.get("/admin", logged, AuthController.admin);

module.exports = {
  router,
};
