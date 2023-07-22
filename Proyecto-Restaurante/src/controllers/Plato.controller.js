const { PlatoModel } = require("../models/Platos.model");
const PlatoController = {};

PlatoController.index = async (req, res) => {
  const platos = await PlatoModel.getPlatos();
  res.render("platos/plato-index", { platos });
};

PlatoController.create = async (req, res) => {
  res.render("platos/plato-create");
};

PlatoController.store = async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const foto = req.file.filename;
    await PlatoModel.createPlato(nombre, precio, foto, descripcion);
    res.redirect("/list-platos");
  } catch (error) {
    console.log(error);
  }
};

PlatoController.edit = async (req, res) => {
  const { idPlato } = req.params;
  const plato = await PlatoModel.getPlato(idPlato);
  res.render("platos/plato-edit", { plato });
};

PlatoController.update = async (req, res) => {
  try {
    const { idPlato } = req.params;
    const { nombre, precio, descripcion } = req.body;
    let foto = "";
    let file = false;

    if (req.file) {
      foto = req.file.filename;
      file = true;
    }
    await PlatoModel.updatePlato(
      idPlato,
      nombre,
      precio,
      foto,
      descripcion,
      file,
    );

    res.redirect("/list-platos");
  } catch (error) {
    console.log(error);
  }
};

PlatoController.delete = async (req, res) => {
  const { idPlato } = req.params;
  await PlatoModel.deletePlato(idPlato);
  // res.redirect("/list-platos");
};
module.exports = {
  PlatoController,
};
