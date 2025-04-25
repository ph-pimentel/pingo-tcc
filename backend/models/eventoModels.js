const conexao = require("../infraestrutura/conexão");
class EventoModels {
  executaQuery(sql2, parametros = "") {
    return new Promise((resolve, reject) => {
      conexao.query(sql2, parametros, (error, resposta) => {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  listar() {
    const sql2 = "SELECT * FROM Eventos";
    return this.executaQuery(sql2);
  }

  criar(novoEvento) {
    const sql2 = "INSERT INTO Eventos SET ?";
    return this.executaQuery(sql2, novoEvento);
  }

  atualizar(atualizarEvento, id) {
    const sql2 = "UPDATE Eventos SET ? WHERE ID_Eventos = ?";
    return this.executaQuery(sql2, [atualizarEvento, id]);
  }

  deletar(id) {
    const sql2 = "DELETE FROM Eventos WHERE ID_Eventos = ?";
    return this.executaQuery(sql2, id);
  }
}

module.exports = new EventoModels();