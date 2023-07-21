const passport = require("passport");

const AuthController = {};

AuthController.auth = (req, res, next) => {
  passport.authenticate("auth", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })(req, res, next);
};

AuthController.admin = (req, res) => {
  res.render("admin/dashboard");
};

AuthController.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect("/");
  });
};

module.exports = {
  AuthController,
};
