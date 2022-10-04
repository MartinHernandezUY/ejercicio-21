const { Comment, Article, User } = require("../models");

async function comentar(req, res) {
  const user = await User.findOne({ where: { email: `${req.body.crearEmail}` } });
  if (!user) {
    await User.create({
      firstname: req.body.crearNombre,
      lastname: req.body.crearApellido,
      email: req.body.crearEmail,
    });
  }
  await Comment.create({
    content: req.body.ingresarComentario,
    articleId: req.params.id,
    userId: user.id,
  });
  res.redirect(`/articulo/${req.params.id}`);
}

async function eliminarComentario(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  await Comment.destroy({ where: { id: req.params.id } });
  res.redirect(`/articulo/${comment.articleId}`);
}

module.exports = {
  eliminarComentario,
  comentar,
};
