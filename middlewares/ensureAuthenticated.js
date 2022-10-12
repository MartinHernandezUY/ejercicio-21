function ensureAuthenticated(req, res, next) {
  console.log("Ok");
  if (req.user) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.redirect("/login");
  }
}

module.exports = ensureAuthenticated;
