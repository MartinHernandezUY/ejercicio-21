const express = require("express");
const adminRouter = express.Router();
const pagesController = require("../controllers/pagesController");

adminRouter.get("/", pagesController.showAdmin);

adminRouter.get("/crear", pagesController.showCrear);

adminRouter.get("/modificar/:id", pagesController.showModificar);

adminRouter.post("/modificar/:id", pagesController.submitModificar);

adminRouter.get("/eliminar/:id", pagesController.submitModificar);

module.exports = adminRouter;
