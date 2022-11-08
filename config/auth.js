module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Plase login to view this resource");
    res.redirect("/users/login");
  },

  isAuthHome: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
};
