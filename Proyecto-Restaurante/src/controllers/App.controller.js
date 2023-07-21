const AppController = {};

AppController.index = (req, res) => {
  res.render("welcome");
};

AppController.comments = (req, res) => {
  res.render("comments");
};

AppController.login = (req, res) => {
  res.render("login");
};

module.exports = {
  AppController,
};
