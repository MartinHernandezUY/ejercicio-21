const { Article, User, Comment, Role } = require("../models");
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");

async function index(req, res) {
  if (req.query.title) {
    const articles = await Article.findAll({
      where: { title: { [Op.like]: `%${req.query.title}%` } },
    });
    return res.json(articles);
  }

  if (req.query.author) {
    const articles = await Article.findAll({ where: { userId: req.query.author } });

    return res.json(articles);
  }

  const articles = await Article.findAll({ include: User });
  return res.json(articles);
}

async function store(req, res) {
  const { title, content, userId } = req.body;
  const newArticle = await Article.create({ title, content, userId });
  return res.status(201).json(newArticle);
}

async function update(req, res) {
  const { title, content } = req.body;
  await Article.update({ title, content }, { where: req.params.id });
  return res.json({ message: "El cambio fue realizado" });
}
async function destroy(req, res) {
  await Article.destroy({ where: req.params.id });
  return res.json({ message: "El Articulo Fue Eliminado" });
}

async function giveToken(req, res) {
  const user = await User.findOne({ where: { email: req.body.email }, include: "role" });
  if (user) {
    const checkPassword = await user.passwordCheck(req.body.password);
    if (checkPassword && user.role.clearance === 40) {
      const payload = user.email;
      const token = jwt.sign(payload, process.env.API_SECRET_STRING);
      res.json(token);
    }
  } else {
    res.send("No Logeado");
  }
}

module.exports = {
  destroy,
  update,
  store,
  index,
  giveToken,
};
