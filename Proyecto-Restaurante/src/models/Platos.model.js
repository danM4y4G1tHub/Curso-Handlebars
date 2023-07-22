const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

//! **** Definicion del modelo Plato
const PlatoModel = sequelize.define("Plato", {
  idPlato: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// ! **** Fin

// **** Metodos
PlatoModel.getPlatos = async () => {
  try {
    const platos = await PlatoModel.findAll();
    const datosPlatos = platos.map((plato) => {
      const platosSinTimeStamp = plato.get({ plain: true });
      delete platosSinTimeStamp.createdAt;
      delete platosSinTimeStamp.updatedAt;
      return platosSinTimeStamp;
    });

    if (platos) return datosPlatos;

    return null;
  } catch (error) {
    console.log(error);
  }
};

PlatoModel.createPlato = async (nombre, precio, foto, descripcion) => {
  try {
    const newPlato = await PlatoModel.create({
      nombre,
      precio,
      foto,
      descripcion,
    });

    if (newPlato)
      return {
        nombre: newPlato.nombre,
        precio: newPlato.precio,
        foto: newPlato.foto,
        descripcion: newPlato.descripcion,
      };

    return null;
  } catch (error) {
    console.log(error);
  }
};

PlatoModel.getPlato = async (idPlato) => {
  try {
    const plato = await PlatoModel.findByPk(idPlato);

    if (plato)
      return {
        idPlato: plato.idPlato,
        nombre: plato.nombre,
        precio: plato.precio,
        foto: plato.foto,
        descripcion: plato.descripcion,
      };

    return null;
  } catch (error) {
    console.log(error);
  }
};

PlatoModel.updatePlato = async (
  idPlato,
  nombre,
  precio,
  foto,
  descripcion,
  file,
) => {
  try {
    let updatedPlato;
    if (file) {
      updatedPlato = await PlatoModel.update(
        {
          nombre,
          precio,
          foto,
          descripcion,
        },
        {
          where: {
            idPlato,
          },
        },
      );
    } else {
      updatedPlato = await PlatoModel.update(
        {
          nombre,
          precio,
          descripcion,
        },
        {
          where: {
            idPlato,
          },
        },
      );
    }

    console.log(updatedPlato);
  } catch (error) {}
};

PlatoModel.deletePlato = async (idPlato) => {
  try {
    await PlatoModel.destroy({
      where: {
        idPlato,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
// **** Fin

module.exports = {
  PlatoModel,
};
