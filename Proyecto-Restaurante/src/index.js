const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const { sequelize, sessionStore } = require("./database/db");
const { urlencoded, json } = require("express");
const { passportInstance } = require("./helpers/passport.helper");
const app = express();

app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());

// **** Configuracion de la Sesión
app.use(
  session({
    secret: "restaurant-session",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
);

// **** Inicialización de Passport
app.use(passportInstance.passport.initialize());
app.use(passportInstance.passport.session());

// **** MOTOR DE PLANTILLAS
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "app",
    extname: ".hbs",
  }),
);
app.set("view engine", ".hbs");

// **** Varviables globales
app.use((req, res, next) => {
  res.locals.usuario = req.user;
  next();
});

// **** RUTAS
app.use(require("./routes/index.routes").router);
app.use(require("./routes/auth.routes").router);
app.use(require("./routes/usuario.routes").router);
app.use(require("./routes/admin.routes").router);
app.use(require("./routes/plato.routes").router);
app.use(require("./routes/comentario.routes").router);

// *** PUBLICS
app.use(express.static(path.join(__dirname, "public")));

// require("./models/Clientes.model");
// require("./models/Comentarios.model");
// require("./models/Pedidos.model");
// require("./models/Platos.model");
// require("./models/PedidoPlatos.model");
// require("./models/Usuario.model");

// **** EJECUTANDO SERVIDOR
async function main() {
  try {
    await sequelize.sync({ alter: false });
    console.log("Conexión establecida con éxito 🦅");
    app.listen((port = 3000), () => {
      console.log("Excecuting server🦉");
    });
  } catch (error) {
    console.log("Conexión fallida 😢", error);
  }
}

main();

// **Para ejecutarla en el movil
/*
 * app.listen((port = 3000, "<ip de la PC>"), () => console.log(""));
 * En el navegador en lugar de localhost:3000 seria <ip de la PC:3000>
 */
