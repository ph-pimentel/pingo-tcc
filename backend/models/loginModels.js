this.conexao = require("../infraestrutura/conexão");

class LoginModels {
  async buscar(id) {
    const [rows] = await this.conexao.query(
      "SELECT * FROM Usuario WHERE ID_Usuario = ?", 
      [id]
    );
    return rows[0];
  }

  async buscarPorEmail(email) {
    const [rows] = await this.conexao.query(
      "SELECT * FROM Usuario WHERE Email = ?", 
      [email.toLowerCase().trim()]
    );
    return rows[0] || null;
  }

  async verificarExistencia(email, cpf) {
    const [rows] = await this.conexao.query(
      "SELECT * FROM Usuario WHERE Email = ? OR CPF = ?", 
      [email, cpf]
    );
    return rows.length > 0;
  }

  async criar(novoLogin) {
    const [result] = await this.conexao.query(
      "INSERT INTO Usuario SET ?", 
      {
        ...novoLogin,
        TipoUsuario: novoLogin.TipoUsuario || "usuario comum"
      }
    );
    return { id: result.insertId, ...novoLogin };
  }

  async atualizar(dados, id) {
    const [result] = await this.conexao.query(
      "UPDATE Usuario SET ? WHERE ID_Usuario = ?",
      [dados, id]
    );
    return result;
  }

  async deletar(id) {
    const [result] = await this.conexao.query(
      "DELETE FROM Usuario WHERE ID_Usuario = ?",
      [id]
    );
    return result;
  }
}

module.exports = new LoginModels();