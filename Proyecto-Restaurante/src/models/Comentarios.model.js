const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

//! **** Definicion del modelo COMENTARIOS
const ComentarioModel = sequelize.define("Comentario", {
  idComentario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
// ! **** Fin

// **** Metodos
ComentarioModel.getComentarios = async () => {
  try {
    const comentarios = await ComentarioModel.findAll({
      attributes: ["nombreUsuario", "detalle", "fecha"],
    });

    const comentariosFormateados = comentarios.map((comentario) => {
      const fechaFormateada = new Date(comentario.fecha).toLocaleString(
        "es-ES",
        { hour12: false },
      );
      return {
        nombreUsuario: comentario.nombreUsuario,
        detalle: comentario.detalle,
        fecha: fechaFormateada,
      };
    });

    return comentariosFormateados;
  } catch (error) {
    console.log(error);
  }
};

ComentarioModel.createComentario = async (nombreUsuario, detalle) => {
  try {
    const newComentario = await ComentarioModel.create({
      nombreUsuario,
      detalle,
      fecha: new Date(),
    });

    const fechaFormateada = newComentario.fecha.toLocaleString({
      hour12: false,
    });

    if (newComentario !== null) {
      return {
        nombreUsuario: newComentario.nombreUsuario,
        detalle: newComentario.detalle,
        fecha: fechaFormateada,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
// **** Fin

module.exports = {
  ComentarioModel,
};
