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
}

module.exports = new QuadrasController();