function isAdmin(req, res, next) {
  req.user && req.user.isAdmin ? next() : res.redirect("/");
}

// function isLoggedInOrIsAdmin(req, res, next) {
//   req.params.id === req.user.id || req.user.isAdmin ? next() : res.redirect('/')
// }

module.exports = { isAdmin };
