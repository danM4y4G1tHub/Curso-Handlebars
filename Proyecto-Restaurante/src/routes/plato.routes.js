const express = require("express");
const { PlatoController } = require("../controllers/Plato.controller");
const { logged } = require("../helpers/auth.helper");
const { upload } = require("../helpers/uploadFile.helper");

const router = express.Router();

router
  .get("/list-platos", logged, PlatoController.index)
  .get("/create-plato", logged, PlatoController.create)
  .post("/store-plato", [logged, upload("foto")], PlatoController.store)
  .get("/edit-plato/:idPlato", logged, PlatoController.edit)
  .post(
    "/update-plato/:idPlato",
    [logged, upload("foto")],
    PlatoController.update,
  )
  .get("/delete-plato/:idPlato", logged, PlatoController.delete);

module.exports = {
  router,
};
