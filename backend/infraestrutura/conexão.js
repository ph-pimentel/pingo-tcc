const mysql2 = require("mysql2");

const conexao = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Root@123",
  database: "pingo",
});

conexao.connect((erro) => {
  if (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro.message);
    return;
  }
  console.log("Conexão bem-sucedida ao banco de dados MySQL!");
});

module.exports = conexao;