const { Router } = require("express");
const router = Router();
const esporteController = require("../controllers/EsportesController");

router.get("/esportes", esporteController.listar);

router.post("/esporte", esporteController.criar);

router.put("/esporte/:id", esporteController.atualizar);

router.delete("/esporte/:id", esporteController.deletar);

module.exports = router;