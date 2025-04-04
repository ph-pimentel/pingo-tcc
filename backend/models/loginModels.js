const conexao = require("../infraestrutura/conexão");

class LoginModels {
  executaQuery(sql2, parametros = []) {
    return new Promise((resolve, reject) => {
      conexao.query(sql2, parametros, (error, resposta) => {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  buscar(id) {
    const sql2 = "SELECT * FROM Usuario WHERE ID_Usuario = ?";
    return this.executaQuery(sql2, [id]);
  }

  async buscarPorEmail(email) {
    const sql = "SELECT * FROM Usuario WHERE Email = ?";
    const resultado = await this.executaQuery(sql, [email]);

    console.log(resultado);  // Veja se o resultado é o esperado

    if (resultado.length === 0) {
      return null; // Garantir que se não encontrar usuário, retorne null
    }
    return resultado[0];  // Retorne o primeiro usuário encontrado
  }

  async verificarExistencia(email, cpf) {
    const sql = "SELECT * FROM Usuario WHERE Email = ? OR CPF = ?";
    const resultado = await this.executaQuery(sql, [email, cpf]);
    return resultado.length > 0; // para retornar null
  }

  async criar(novoLogin) {
    const sql = "INSERT INTO Usuario (NomeUsuario, Email, Senha, CPF) VALUES (?, ?, ?, ?)";
  
    const resultado = await this.executaQuery(sql, [
      novoLogin.NomeUsuario,
      novoLogin.Email,
      novoLogin.Senha,
      novoLogin.CPF
    ]);

    return { id: resultado.insertId, ...novoLogin };
}

  atualizar(atualizarLogin, id) {
    const sql2 = "UPDATE Usuario SET ? WHERE ID_Usuario = ?";
    return this.executaQuery(sql2, [atualizarLogin, id]);
  }

  deletar(id) {
    const sql2 = "DELETE FROM Usuario WHERE ID_Usuario = ?";
    return this.executaQuery(sql2, [id]);
  }
}

module.exports = new LoginModels();