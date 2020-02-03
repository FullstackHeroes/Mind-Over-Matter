function isAdmin(req, res, next) {
  req.user && req.user.isAdmin ? next() : res.redirect("/");
}

module.exports = { isAdmin };
