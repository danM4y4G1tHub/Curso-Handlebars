const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { UsuarioModel } = require("../models/Usuario.model");

passport.use(
  "auth",
  new LocalStrategy(
    {
      usernameField: "cuenta",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, cuenta, password, done) => {
      const user = await UsuarioModel.existCuenta(cuenta);
      if (user.exist) {
        if (await UsuarioModel.verifyPassword(cuenta, password)) {
          console.log(`Credenciales correctas`);
          done(null, user);
        } else {
          console.log(`La contraseña es incorrecta`);
          done(null, false);
        }
      } else {
        console.log(`La cuenta no existe`);
        done(null, false);
      }
    },
  ),
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.idUsuario);
});

passport.deserializeUser(async (id, done) => {
  const user = await UsuarioModel.getCuenta(id);
  done(null, user);
});

const passportInstance = { passport };

module.exports = { passportInstance };
