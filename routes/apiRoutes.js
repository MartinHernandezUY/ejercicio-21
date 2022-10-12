const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");

apiRouter.post("/tokens", apiController.giveToken);

apiRouter.use(checkJwt({ secret: process.env.API_SECRET_STRING, algorithms: ["HS256"] }));

apiRouter.get("/articulos", apiController.index);

apiRouter.post("/articulos", apiController.store);

apiRouter.patch("/articulos/:id", apiController.update);

apiRouter.delete("/articulos/:id", apiController.destroy);

module.exports = apiRouter;
