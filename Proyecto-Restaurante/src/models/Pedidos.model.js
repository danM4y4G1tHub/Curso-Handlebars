const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const { PlatoModel } = require("./Platos.model");

const PedidoModel = sequelize.define("Pedido", {
  idPedido: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fechaPedido: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  PedidoModel,
};
