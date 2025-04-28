const express = require("express");
const app = express();
const port = 3001;
const appCustom = require("./config/appCustom");
const cors = require("cors");
app.use(cors());
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true }));

appCustom(app, express);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});