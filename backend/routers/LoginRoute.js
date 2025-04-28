const { Router } = require("express");
const router = Router();
const LoginController = require("../controllers/LoginController");
const senha = require("../Segurança");

router.get("/perfil/:id", senha, LoginController.buscar);

router.post("/login", LoginController.login);

router.post("/registro", LoginController.criar);

router.put("/user/:id", LoginController.atualizar);

router.delete("/user/:id", LoginController.deletar);

module.exports = router;
