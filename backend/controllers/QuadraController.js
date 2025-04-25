const QuadrasModels = require("../models/quadraModels");

class QuadrasController {
  async filtrar(req, res) {
    try {
      const { local, esporte, tipoQuadra } = req.query;
      
      const quadras = await QuadrasModels.buscarPorFiltros({
        local,
        esporte,
        tipoQuadra
      });
      
      res.status(200).json(quadras);
    } catch (error) {
      res.status(500).json({ message: "Erro ao filtrar quadras" });
    }
  }

  async listarEsportes(req, res) {
    try {
      const esportes = await QuadrasModels.listarEsportes();
      res.status(200).json(esportes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar esportes" });
    }
  }
}

module.exports = new QuadrasController();