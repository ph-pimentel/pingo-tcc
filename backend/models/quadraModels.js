// backend/models/quadrasModels.js
const conexao = require("../infraestrutura/conexão");

class QuadrasModels {
  executaQuery(sql, parametros = []) {
    return new Promise((resolve, reject) => {
      conexao.query(sql, parametros, (error, resposta) => {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  async buscarPorFiltros(filtros) {
    let sql = `
      SELECT q.*, e.Nome as NomeEsporte 
      FROM Quadra q
      LEFT JOIN Esportes e ON q.ID_Esporte = e.ID_Esporte
      WHERE 1=1
    `;

    const parametros = [];

    // Filtro por esporte
    if (filtros.esporte) {
      sql += ` AND e.Nome = ?`;
      parametros.push(filtros.esporte);
    }

    // Filtro por tipo de quadra
    if (filtros.tipoQuadra) {
      sql += ` AND q.TipoQuadra = ?`;
      parametros.push(filtros.tipoQuadra === "Proprietario" ? 1 : 0);
    }

    // Filtro por local (cidade/bairro)
    if (filtros.local) {
      sql += ` AND (q.Cidade LIKE ? OR q.Bairro LIKE ?)`;
      parametros.push(`%${filtros.local}%`, `%${filtros.local}%`);
    }

    // Ordenação por acessos
    sql += ` ORDER BY q.Acessos DESC`;

    return this.executaQuery(sql, parametros);
  }
}

module.exports = new QuadrasModels();
