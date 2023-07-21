const { ComentarioModel } = require("../models/Comentarios.model");
const ComentarioController = {};

ComentarioController.index = async (req, res) => {
  const comentarios = await ComentarioModel.getComentarios();
  res.render("comments", { comentarios });
};

ComentarioController.store = async (req, res) => {
  try {
    const { nombreUsuario, detalle } = req.body;
    await ComentarioModel.createComentario(nombreUsuario, detalle);
    res.redirect("/comments");
  } catch (error) {}
};

module.exports = {
  ComentarioController,
};
