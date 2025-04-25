const esportesModels = require("../models/esportesModels");
class EsportesController {
  async listar(req, res) {
    try {
      const esporte = await esportesModels.listar();
      return res.status(200).json(esporte); 
    } catch (error) {
      console.error("Erro ao buscar esporte:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async criar(req, res) {
    const novoEsporte = req.body;
    try {
      const esporteCriado = await esportesModels.criar(novoEsporte);
      return res.status(201).json(esporteCriado); 
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(400).json({ message: error.message }); 
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const esporteAtualizado = req.body;
    try {
      const esporte = await esportesModels.atualizar(esporteAtualizado, id); 
      return res.status(202).json(esporte); 
    } catch (error) {
      console.error("Erro ao atualizar esporte:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const esporteDeletado = await esportesModels.deletar(id);
      return res.status(200).json(esporteDeletado);
    } catch (error) {
      console.error("Erro ao deletar esporte:", error);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new EsportesController();