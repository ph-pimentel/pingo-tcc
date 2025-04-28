const { Router } = require("express");
const eventoRouter = require("./EventosRoute");
const loginRouter = require("./LoginRoute");
const esportesRouter = require("./EsportesRouter");
const quadrasRouter = require("./QuadraRouter");

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/eventos", eventoRouter);
  app.use("/auth", loginRouter);
  app.use("/esportes", esportesRouter);
  app.use("/quadras", quadrasRouter);
};