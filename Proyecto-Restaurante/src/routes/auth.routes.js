const express = require("express");
const { AuthController } = require("../controllers/Auth.controller");

const router = express.Router();

router.post("/auth", AuthController.auth);
router.get("/logout", AuthController.logout);

module.exports = {
  router,
};
