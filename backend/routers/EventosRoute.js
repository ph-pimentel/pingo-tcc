const { Router } = require("express");
const router = Router();
const eventoController = require("../controllers/EventosController");

router.get("/eventos", eventoController.buscar);

router.post("/eventos", eventoController.criar);

router.put("/eventos/:id", eventoController.atualizar);

router.delete("/evento/:id", eventoController.deletar);

module.exports = router;