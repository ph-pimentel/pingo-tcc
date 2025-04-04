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
    const sql2 = "SELECT * FROM Esportes";
    return this.executaQuery(sql2);
  }

  criar(novoEsporte) {
    const sql2 = "INSERT INTO Esportes SET ?";
    return this.executaQuery(sql2, novoEsporte);
  }

  atualizar(atualizarEsporte, id) {
    const sql2 = "UPDATE Esportes SET ? WHERE ID_Esporte = ?";
    return this.executaQuery(sql2, [atualizarEsporte, id]);
  }

  deletar(id) {
    const sql2 = "DELETE FROM Esportes WHERE ID_Esporte = ?";
    return this.executaQuery(sql2, id);
  }
}

module.exports = new EventoModels();