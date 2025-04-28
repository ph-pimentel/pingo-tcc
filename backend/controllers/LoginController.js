const jwt = require("jsonwebtoken");
const LoginModels = require("../models/loginModels");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "PingoMaisMelhor";

class LoginController {
  async criar(req, res) {
    const { NomeUsuario, Email, Senha, CPF } = req.body;
    try {
      const usuarioExistente = await LoginModels.verificarExistencia(
        Email,
        CPF
      );
      if (usuarioExistente) {
        return res
          .status(400)
          .json({ message: "E-mail ou CPF já cadastrados!" });
      }

      const senhaHash = await bcrypt.hash(Senha, 10);
      const novoLogin = { NomeUsuario, Email, Senha: senhaHash, CPF };
      const usuarioCriado = await LoginModels.criar(novoLogin);

      return res.status(201).json({
        message: "Usuário registrado com sucesso!",
        usuario: usuarioCriado,
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro ao criar usuário." });
    }
  }

  async login(req, res) {
    const { Email, Senha } = req.body;

    try {
      const usuario = await LoginModels.buscarPorEmail(Email.toLowerCase());
      if (!usuario) {
        return res.status(400).json({ message: "E-Mail ou senha incorretos" });
      }

      const senhaCorreta = await bcrypt.compare(Senha, usuario.Senha);
      if (!senhaCorreta) {
        return res.status(400).json({ message: "E-Mail ou senha incorretos" });
      }

      const token = jwt.sign(
        { id: usuario.ID_Usuario, email: usuario.Email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login bem-sucedido!",
        usuario: {
          id: usuario.ID_Usuario,
          nome: usuario.NomeUsuario,
          email: usuario.Email,
        },
        token,
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ message: "Erro ao realizar login." });
    }
  }

  async buscar(req, res) {
    const { id } = req.params;
    try {
      const usuario = await LoginModels.buscar(id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const loginAtualizado = req.body;
    try {
      const result = await LoginModels.atualizar(loginAtualizado, id);
      res.status(202).json(result);
    } catch (error) {
      res.status(402).json({ message: error.message });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const result = await LoginModels.deletar(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new LoginController();
