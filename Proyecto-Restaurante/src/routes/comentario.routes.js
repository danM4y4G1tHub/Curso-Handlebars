const express = require("express");
const {
  ComentarioController,
} = require("../controllers/Comentario.controller");

const router = express.Router();

router.post("/store-comentario", ComentarioController.store);

module.exports = {
  router,
};
