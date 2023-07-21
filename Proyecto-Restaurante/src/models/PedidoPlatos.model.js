const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const { PedidoModel } = require("./Pedidos.model");
const { PlatoModel } = require("./Platos.model");

const PedidoPlatoModel = sequelize.define("PedidoPlato", {
  idPedPlato: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

PedidoPlatoModel.associate = (models) => {
  PedidoPlatoModel.belongsTo(models.PedidoModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "pedidoId",
    sourceKey: "pedidoId",
  });

  PedidoPlatoModel.belongsTo(models.PlatoModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "platoId",
    sourceKey: "platoId",
  });

  return PedidoPlatoModel;
};

module.exports = {
  PedidoPlatoModel,
};
