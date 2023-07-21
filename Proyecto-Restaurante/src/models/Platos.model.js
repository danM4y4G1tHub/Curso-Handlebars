const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

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

module.exports = {
  PlatoModel,
};
