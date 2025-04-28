const express = require('express');
const router = express.Router();
const conexao = require('../infraestrutura/conexão');

// Listar todas as quadras com o nome do esporte
router.get('/', (req, res) => {
  const sql = `
    SELECT q.*, e.Nome as NomeEsporte
    FROM Quadra q
    LEFT JOIN Esportes e ON q.ID_Esporte = e.ID_Esporte
  `;
  
  conexao.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }
    res.json(resultados);
  });
});

// Filtrar quadras
router.get('/filtrar', (req, res) => {
  const { local, esporte, tipo } = req.query;
  
  let sql = `SELECT * FROM Quadra WHERE 1=1`;
  const params = [];

  if (local) {
    sql += ` AND (Cidade LIKE ? OR Bairro LIKE ?)`;
    params.push(`%${local}%`, `%${local}%`);
  }
  if (esporte) {
    sql += ` AND ID_Esporte = ?`;
    params.push(esporte);
  }
  if (tipo) {
    sql += ` AND TipoQuadra = ?`;
    params.push(tipo === 'Proprietario' ? 1 : 0);
  }

  conexao.query(sql, params, (error, resultados) => {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }
    res.json(resultados);
  });
});

// Listar esportes de uma quadra específica
router.get('/:id/esportes', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT e.ID_Esporte, e.Nome
    FROM Esportes e
    JOIN QuadraEsportes qe ON e.ID_Esporte = qe.ID_Esporte
    WHERE qe.ID_Quadra = ?
  `;

  conexao.query(sql, [id], (error, resultados) => {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }
    res.json(resultados);
  });
});

// Listar horários disponíveis de uma quadra específica
router.get('/:id/horarios', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT ID_Horario, TIME_FORMAT(horario, '%H:%i') as horario
    FROM HorariosDisponiveis
    WHERE ID_Quadra = ? AND disponivel = true
  `;

  conexao.query(sql, [id], (error, resultados) => {
    if (error) {
      return res.status(500).json({ erro: error.message });
    }
    res.json(resultados);
  });
});

module.exports = router;
