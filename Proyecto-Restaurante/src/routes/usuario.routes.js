const express = require("express");
const { UsuarioController } = require("../controllers/Usuario.controller");
const { logged } = require("../helpers/auth.helper");

const router = express.Router();

router.get("/create-usuario", logged, UsuarioController.create);
router.post("/store-usuario", logged, UsuarioController.store);

module.exports = {
  router,
};
