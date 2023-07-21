const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const bcrypt = require("bcrypt");

//! **** Definicion del modelo USUARIO
const UsuarioModel = sequelize.define("Usuario", {
  idUsuario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuenta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("Administrador", "Cajero"),
    allowNull: false,
  },
});

UsuarioModel.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

// ! **** Fin

// **** Metodos
UsuarioModel.createUsuario = async (nombre, cuenta, password, rol) => {
  try {
    const newUser = await UsuarioModel.create({
      nombre,
      cuenta,
      password,
      rol,
    });

    if (newUser !== null) {
      return {
        nombre: newUser.nombre,
        cuenta: newUser.cuenta,
        password: newUser.password,
        rol: newUser.rol,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

UsuarioModel.existCuenta = async (cuenta) => {
  try {
    const user = await UsuarioModel.findOne({
      where: {
        cuenta,
      },
      attributes: ["idUsuario", "cuenta"],
    });

    if (user) {
      const usuario = {
        exist: true,
        idUsuario: user.idUsuario,
        cuenta: user.cuenta,
      };
      return usuario;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

UsuarioModel.verifyPassword = async (cuenta, password) => {
  try {
    const pass = await UsuarioModel.findOne({
      where: {
        cuenta,
      },
      attributes: ["password"],
    });

    const correct = await bcrypt.compare(password, pass.password);
    if (correct) return true;

    return false;
  } catch (error) {
    console.log(error);
  }
};

UsuarioModel.getCuenta = async (idUsuario) => {
  try {
    const user = await UsuarioModel.findByPk(idUsuario, {
      attributes: ["cuenta"],
    });
    const cuenta = user.cuenta;
    if (user) return cuenta;

    return null;
  } catch (error) {
    console.log(error);
  }
};

UsuarioModel.getUsuario = async (cuenta) => {
  try {
    const usuario = await UsuarioModel.findOne({
      where: {
        cuenta,
      },
      attributes: ["idUsuario", "cuenta", "password"],
    });
  } catch (error) {
    console.log(error);
  }
};
// **** Fin

module.exports = {
  UsuarioModel,
};
