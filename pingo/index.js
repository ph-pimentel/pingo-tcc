const express = require("express");
const app = express();
const port = 3001;
const appCustom = require("./config/appCustom");
const cors = require("cors");
app.use(cors());


appCustom(app, express);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});