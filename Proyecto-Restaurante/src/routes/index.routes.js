const express = require("express");
const { AppController } = require("../controllers/App.controller");
const {
  ComentarioController,
} = require("../controllers/Comentario.controller");
const { noLogged } = require("../helpers/auth.helper");

const router = express.Router();

router.get("/", noLogged, AppController.index);
router.get("/comments", noLogged, ComentarioController.index);
router.get("/login", noLogged, AppController.login);

module.exports = {
  router,
};
