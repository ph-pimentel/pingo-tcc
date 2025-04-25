const { Router } = require("express");
const router = Router();
const conexao = require("../infraestrutura/conexão");

// Rota para filtrar quadras
router.get("/filtrar", async (req, res) => {
  try {
    const { local, esporte, tipo } = req.query;

    let query = `
      SELECT * FROM Quadra 
      WHERE 1=1
    `;
    const params = [];

    if (local) {
      query += ` AND (Cidade LIKE ? OR Bairro LIKE ?)`;
      params.push(`%${local}%`, `%${local}%`);
    }

    if (esporte) {
      query += ` AND ID_Esporte = ?`;
      params.push(esporte);
    }

    if (tipo) {
      query += ` AND TipoQuadra = ?`;
      params.push(tipo === "Proprietario" ? 1 : 0);
    }

    const [quadras] = await conexao.query(query, params);
    res.json(quadras);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rota para listar todas as quadras
router.get("/", async (req, res) => {
  try {
    const [quadras] = await conexao.query(`
      SELECT q.*, e.Nome as NomeEsporte 
      FROM Quadra q
      LEFT JOIN Esportes e ON q.ID_Esporte = e.ID_Esporte
    `);
    res.json(quadras);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rota para buscar esportes de uma quadra específica
router.get("/:id/esportes", async (req, res) => {
  try {
    const { id } = req.params;
    const [esportes] = await conexao.query(
      `
          SELECT e.ID_Esporte, e.Nome 
          FROM Esportes e
          JOIN QuadraEsportes qe ON e.ID_Esporte = qe.ID_Esporte
          WHERE qe.ID_Quadra = ?
      `,
      [id]
    );
    res.json(esportes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Rota para buscar horários de uma quadra específica
router.get("/:id/horarios", async (req, res) => {
  try {
    const { id } = req.params;
    const [horarios] = await conexao.query(
      `
          SELECT ID_Horario, TIME_FORMAT(horario, '%H:%i') as horario 
          FROM HorariosDisponiveis 
          WHERE ID_Quadra = ? AND disponivel = true
      `,
      [id]
    );
    res.json(horarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
