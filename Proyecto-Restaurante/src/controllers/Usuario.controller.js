const { UsuarioModel } = require("../models/Usuario.model");
const UsuarioController = {};

UsuarioController.index = async (req, res) => {
  const usuarios = await UsuarioModel.getUsuarios();
  //   res.render("", { usuarios });
};

UsuarioController.create = async (req, res) => {
  res.render("usuarios/usuario-create");
};

UsuarioController.store = async (req, res) => {
  try {
    const { nombre, cuenta, password, rol } = req.body;
    await UsuarioModel.createUsuario(nombre, cuenta, password, rol);
    res.redirect("/");
  } catch (error) {}
};

module.exports = {
  UsuarioController,
};
