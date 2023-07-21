const Sequelize = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database.sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
});

const sessionStore = new SequelizeStore({
  db: sequelize,
});

module.exports = {
  sequelize,
  sessionStore,
};
