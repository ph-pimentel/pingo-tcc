const { Router } = require("express");
const eventoRouter = require("./EventosRoute");
const loginRouter = require("./LoginRoute");
const esportesRouter = require("./EsportesRouter");
const quadrasRouter = require("./QuadraRouter");

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", eventoRouter);
  app.use("/auth", loginRouter);
  app.use("/", esportesRouter);
  app.use("/quadras", quadrasRouter);
};