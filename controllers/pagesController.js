const { Article, User, Comment } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: "user" });
  res.render("home", { articles });
}

function showLogin(req, res) {
  res.render("login");
}

function showRegister(req, res) {
  res.render("register");
}

async function postRegister(req, res) {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
}

function logOut(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll();
  res.render("admin", { articles });
}

async function showCrear(req, res) {
  res.render("crearArticulo");
}

async function showModificar(req, res) {
  const article = await Article.findByPk(req.params.id, { include: "user" });
  res.render("modificarArticulo", { article });
}

async function showArticulo(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
      {
        model: Comment,
        include: [User],
      },
    ],
  });
  const comments = article.comments;
  res.render("articulo", { article, comments });
}

async function showComentar(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("addComment", { article });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showAdmin,
  showCrear,
  showModificar,
  showArticulo,
  showComentar,
  showLogin,
  showRegister,
  postRegister,
  logOut,
};
