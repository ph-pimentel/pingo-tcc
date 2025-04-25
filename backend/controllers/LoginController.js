const jwt = require("jsonwebtoken");
const LoginModels = require("../models/loginModels");
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || "PingoMaisMelhor";

class LoginController {
  async criar(req, res) {
    try {
      const { NomeUsuario, Email, Senha, CPF } = req.body;
      
      if (await LoginModels.verificarExistencia(Email, CPF)) {
        return res.status(400).json({ message: "E-mail ou CPF já cadastrados!" });
      }

      const senhaHash = await bcrypt.hash(Senha, 10);
      const usuarioCriado = await LoginModels.criar({
        NomeUsuario,
        Email,
        Senha: senhaHash,
        CPF
      });

      return res.status(201).json({ 
        message: "Usuário registrado com sucesso!", 
        usuario: usuarioCriado 
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro ao criar usuário." });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = this.normalizarCredenciais(req.body);
      
      const usuario = await LoginModels.buscarPorEmail(email);
      if (!usuario || !(await bcrypt.compare(senha, usuario.Senha))) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const token = this.gerarToken(usuario);
      return res.json(this.formatarRespostaLogin(usuario, token));
      
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // Métodos auxiliares
  normalizarCredenciais(body) {
    const { email, Email, senha, Senha } = body;
    return {
      email: (email || Email).toString().toLowerCase().trim(),
      senha: senha || Senha
    };
  }

  gerarToken(usuario) {
    return jwt.sign(
      { id: usuario.ID_Usuario, email: usuario.Email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }

  formatarRespostaLogin(usuario, token) {
    return {
      message: "Login bem-sucedido!",
      usuario: {
        id: usuario.ID_Usuario,
        nome: usuario.NomeUsuario,
        email: usuario.Email,
      },
      token
      // fim dos metodos auxiliares
    };
  }

  async buscar(req, res) {
    try {
      const usuario = await LoginModels.buscar(req.params.id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const result = await LoginModels.atualizar(req.body, req.params.id);
      res.status(202).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const result = await LoginModels.deletar(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new LoginController();