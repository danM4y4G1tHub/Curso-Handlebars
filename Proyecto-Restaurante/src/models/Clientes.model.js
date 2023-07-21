const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const { PedidoModel } = require("./Pedidos.model");

const ClienteModel = sequelize.define("Cliente", {
  idCliente: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NIT: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ClienteModel.hasMany(PedidoModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "clienteId",
  sourceKey: "idCliente",
});

PedidoModel.belongsTo(ClienteModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "clienteId",
  targetKey: "idCliente",
});

module.exports = {
  ClienteModel,
};
