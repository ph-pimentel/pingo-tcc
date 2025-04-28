const eventoModels = require("../models/eventoModels");

class EventoController {
  async buscar(req, res) {
    try {
      const eventos = await eventoModels.listar();
      return res.status(200).json(eventos); 
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async criar(req, res) {
    const novoEvento = req.body;
    try {
      const eventoCriado = await eventoModels.criar(novoEvento);
      return res.status(201).json(eventoCriado); 
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(400).json({ message: error.message }); 
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const eventoAtualizado = req.body;
    try {
      const evento = await eventoModels.atualizar(eventoAtualizado, id); 
      return res.status(202).json(evento); 
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const eventoDeletado = await eventoModels.deletar(id);
      return res.status(200).json(eventoDeletado);
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new EventoController();