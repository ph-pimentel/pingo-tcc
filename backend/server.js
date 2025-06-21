const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5000;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const process = require("process");
const sharp = require("sharp");
//Middleware que permite Cors e tratamento de Json
app.use(
  cors({
    origin: "http://localhost:5173", // ou seu domínio de produção
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

//Conexão Mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234", //1234
  database: "PINGO",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");
});

//Direcionamento dos arquivos de imagem

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/// --> Sessão Quadras Pub

//Rota que vai conter os dados das quadras
app.get("/quadraspub", (req, res) => {
  db.query(`
    SELECT q.*, e.Nome as Esporte 
    FROM Quadra q
    LEFT JOIN QuadraEsportes qe ON q.ID_Quadra = qe.ID_Quadra
    LEFT JOIN Esportes e ON qe.ID_Esporte = e.ID_Esporte
    WHERE q.TipoQuadra = 0
  `, (err, results) => {
    if (err) {
      console.error("Erro ao obter quadras:", err);
      return res.status(500).send("Erro ao obter quadras");
    }
    res.json(results);
  });
});

// Rota para criar uma nova quadra publica
app.post("/quadraspub", (req, res) => {
  const { NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Cidade, Bairro } = req.body;
  db.query(
    "INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Cidade, Bairro, TipoQuadra) VALUES (?,?,?,?,?,?,?,?)",
    [NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Cidade, Bairro, 0],
    (err, result) => {
      if (err) throw err;
      res.json({
        ID_Quadra: result.insertId,
        NomeQuadra,
        EnderecoQuadra,
        Regiao,
        TipoQuadraFisica,
        Descricao,
        Cidade,
        Bairro,
        TipoQuadra: 0
      });
    }
  );
});

//Rota para atualizar uma quadra pública existente
app.put("/quadraspub/att/:id", (req, res) => {
  const { id } = req.params;
  const { NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Cidade, Bairro } = req.body;

  db.query(
    "UPDATE Quadra SET NomeQuadra = ?, EnderecoQuadra = ?, Regiao = ?, TipoQuadraFisica = ?, Descricao = ?, Cidade = ?, Bairro = ? WHERE ID_Quadra = ?",
    [NomeQuadra, EnderecoQuadra, Regiao, TipoQuadraFisica, Descricao, Cidade, Bairro, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar quadra:", err);
        return res.status(500).json({ error: "Quadra não encontrada" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Quadra não encontrada" });
      }

      res.json({
        ID_Quadra: id,
        NomeQuadra,
        EnderecoQuadra,
        Regiao,
        TipoQuadraFisica,
        Descricao,
        Cidade,
        Bairro,
        message: "Quadra atualizada com sucesso",
      });
    }
  );
});

//Rota para deletar uma quadra de acordo com o ID
app.delete("/quadraspub/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Quadra WHERE ID_Quadra = ?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar quadra:", err);
      return res.status(500).json({ error: "Erro ao deletar quadra" });
    }
    res.json({ message: "Quadra deletada com sucesso" });
  });
});

//-> Single Page Quadra Pub
app.get("/quadraspub/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Quadra WHERE ID_Quadra = ?", [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter quadra:", err);
      return res.status(500).send("Erro ao obter quadra");
    }
    res.json({ results });
  });
});

/// --> Sessão Quadras Privadas BackEnd

//Rota que vai conter os dados das quadras privadas
app.get("/quadraspriv", (req, res) => {
  db.query(`
    SELECT 
      q.*,
      u.NomeUsuario as NomeProprietario,
      e.Nome as Esporte
    FROM Quadra q
    JOIN QuadraPrivada qp ON q.ID_Quadra = qp.ID_Quadra
    JOIN Usuario u ON qp.ID_Proprietario = u.ID_Usuario
    LEFT JOIN QuadraEsportes qe ON q.ID_Quadra = qe.ID_Quadra
    LEFT JOIN Esportes e ON qe.ID_Esporte = e.ID_Esporte
    WHERE q.TipoQuadra = 1
  `, (err, results) => {
    if (err) {
      console.error("Erro ao obter quadras:", err);
      return res.status(500).send("Erro ao obter quadras");
    }
    res.json(results);
  });
});
2

//Rota para deletar uma quadra de acordo com o ID
app.delete("/quadraspriv/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Quadra WHERE ID_Quadra = ?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar quadra:", err);
      return res.status(500).json({ error: "Erro ao deletar quadra" });
    }
    res.json({ message: "Quadra deletada com sucesso" });
  });
});

app.get("/quadraspriv/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `
    SELECT 
      q.*,
      qp.ContatoTelefone,
      qp.ContatoEmail,
      qp.HorarioDisponiveis,
      u.NomeUsuario as NomeProprietario
    FROM Quadra q
    JOIN QuadraPrivada qp ON q.ID_Quadra = qp.ID_Quadra
    JOIN Usuario u ON qp.ID_Proprietario = u.ID_Usuario
    WHERE q.ID_Quadra = ?
    `,
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter quadra privada:", err);
        return res.status(500).json({ error: "Erro ao obter quadra privada" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Quadra não encontrada" });
      }
      res.json(results[0]);
    }
  );
});

//Rota para atualizar uma quadra privada existente
app.put("/quadraspriv/att/:id", (req, res) => {
  const { id } = req.params;
  const {
    NomeQuadra,
    EnderecoQuadra,
    Bairro,
    Cidade,
    Regiao,
    TipoQuadraFisica,
    Descricao,
    HorarioDisponiveis,
    ContatoTelefone,
    ContatoEmail
  } = req.body;

  db.query(
    `UPDATE Quadra SET 
      NomeQuadra = ?, 
      EnderecoQuadra = ?, 
      Bairro = ?, 
      Cidade = ?,
      Regiao = ?,
      TipoQuadraFisica = ?,
      Descricao = ?
    WHERE ID_Quadra = ?`,
    [NomeQuadra, EnderecoQuadra, Bairro, Cidade, Regiao, TipoQuadraFisica, Descricao, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar quadra:", err);
        return res.status(500).json({ error: "Erro ao atualizar quadra" });
      }

      db.query(
        `UPDATE QuadraPrivada SET 
          HorarioDisponiveis = ?, 
          ContatoTelefone = ?, 
          ContatoEmail = ?
        WHERE ID_Quadra = ?`,
        [HorarioDisponiveis, ContatoTelefone, ContatoEmail, id],
        (err, result) => {
          if (err) {
            console.error("Erro ao atualizar quadra privada:", err);
            return res.status(500).json({ error: "Erro ao atualizar quadra privada" });
          }
          res.json({ message: "Quadra atualizada com sucesso" });
        }
      );
    }
  );
});

app.post("/quadrapriv/registre", (req, res) => {
  const {
    NomeQuadra,
    EnderecoQuadra,
    Bairro,
    Cidade,
    Regiao,
    TipoQuadraFisica,
    Descricao,
    HorarioDisponiveis,
    ContatoTelefone,
    ContatoEmail,
    ID_Proprietario
  } = req.body;

  db.query(
    `INSERT INTO Quadra (
      NomeQuadra, 
      EnderecoQuadra, 
      Bairro, 
      Cidade,
      Regiao,
      TipoQuadraFisica,
      Descricao,
      TipoQuadra
    ) VALUES (?,?,?,?,?,?,?,1)`,
    [NomeQuadra, EnderecoQuadra, Bairro, Cidade, Regiao, TipoQuadraFisica, Descricao],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar quadra:", err);
        return res.status(500).send("Erro ao criar quadra");
      }

      const quadraId = result.insertId;
      db.query(
        `INSERT INTO QuadraPrivada (
          ID_Quadra, 
          HorarioDisponiveis, 
          ContatoTelefone, 
          ContatoEmail, 
          ID_Proprietario
        ) VALUES (?,?,?,?,?)`,
        [quadraId, HorarioDisponiveis, ContatoTelefone, ContatoEmail, ID_Proprietario],
        (err, result) => {
          if (err) {
            console.error("Erro ao criar quadra privada:", err);
            return res.status(500).send("Erro ao criar quadra privada");
          }
          res.json({ message: "Quadra privada criada com sucesso", ID_Quadra: quadraId });
        }
      );
    }
  );
});

/// --> Sessão Usuarios BackEnd

//Rota que vai conter os dados dos usuarios
app.get("/users", (req, res) => {
  db.query("SELECT * FROM Usuario", (err, results) => {
    if (err) {
      console.error("Erro ao obter usuarios:", err);
      return res.status(500).send("Erro ao obter usuarios");
    }
    res.json(results);
  });
});

// ---> Rota para deletar um usuario de acordo com o ID
app.delete("/users/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Usuario WHERE ID_Usuario = ?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar usuario:", err);
      return res.status(500).json({ error: "Erro ao deletar usuario" });
    }
    res.json({ message: "Usuario deletada com sucesso" });
  });
});

// Single Page Quadra Privada
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM Usuario WHERE ID_Usuario = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter usuario:", err);
        return res.status(500).send("Erro ao obter quadra");
      }
      res.json({ results });
    }
  );
});

//Rota para atualizar um usuario para Proprietario
app.put("/user/attprop/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Usuario SET TipoUsuario = 'Proprietario' WHERE ID_Usuario = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuario:", err);
        return res.status(500).json({ error: "Usuario não encontrada" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario não encontrada" });
      }

      res.json({
        ID_Usuario: id,
        TipoUsuario: "Proprietario",
        message: "Usuario atualizada com sucesso",
      });
    }
  );
});

//Rota para atualizar um usuario para Proprietario
app.put("/user/attadmin/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Usuario SET TipoUsuario = 'Admin' WHERE ID_Usuario = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuario:", err);
        return res.status(500).json({ error: "Usuario não encontrada" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario não encontrada" });
      }

      res.json({
        ID_Usuario: id,
        TipoUsuario: "Admin",
        message: "Usuario atualizada com sucesso",
      });
    }
  );
});

//Rota para atualizar um usuario para Comum
app.put("/user/attcomum/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Usuario SET TipoUsuario = 'Usuario comum' WHERE ID_Usuario = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuario:", err);
        return res.status(500).json({ error: "Usuario não encontrada" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario não encontrada" });
      }

      res.json({
        ID_Usuario: id,
        TipoUsuario: "Usuario comum",
        message: "Usuario atualizada com sucesso",
      });
    }
  );
});

//Rota para atualizar um usuario existente
app.put("/user/att/:id", (req, res) => {
  const { id } = req.params;
  const { NomeUsuario, Email, TipoUsuario } = req.body;
  db.query(
    "UPDATE Usuario SET NomeUsuario = ?, Email = ?, TipoUsuario = ? WHERE ID_Usuario = ?",
    [NomeUsuario, Email, TipoUsuario, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar usuario:", err);
        return res.status(500).json({ error: "Usuario não encontrada" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario não encontrada" });
      }

      res.json({
        ID_Usuario: id,
        NomeUsuario,
        Email,
        TipoUsuario,
        message: "Usuario atualizada com sucesso",
      });
    }
  );
});

app.post("/login", (req, res) => {
  const { Email, Senha, manterConectado } = req.body;

  if (!Email || !Senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  //Consulta do db para encontrar o usuario em questao
  db.query(
    "SELECT * FROM Usuario WHERE Email = ? AND Senha = ? AND TipoUsuario IN ('proprietario', 'admin')",
    [Email, Senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao fazer login:", err);
        return res.status(500).json({ error: "Erro ao fazer login" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const usuario = results[0];

      const tempoExpiracao = manterConectado ? "72h" : "1h";

      //Gera uma sessão JWT
      const token = jwt.sign(
        {
          ID_Usuario: usuario.ID_Usuario,
          Nome: usuario.NomeUsuario,
          Email: usuario.Email,
          TipoUsuario: usuario.TipoUsuario,
          Foto: usuario.FotoUsuario,
        },
        "pingo123", //chave JWT
        { expiresIn: tempoExpiracao }
      );

      res.json({
        message: "Login bem-sucedido",
        token: token,
      });
    }
  );
});

/// -> Parte Perfil Backend

// Rota para atualizar o perfil do usuário
app.put("/perfil/att/:id", (req, res) => {
  const { id } = req.params;
  const { Nome, Email } = req.body;

  db.query(
    "UPDATE Usuario SET NomeUsuario = ?, Email = ? WHERE ID_Usuario = ?",
    [Nome, Email, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar perfil:", err);
        return res.status(500).json({ error: "Erro ao atualizar perfil" });
      }

      //Busca os dados atualizado
      db.query(
        "SELECT ID_Usuario, NomeUsuario, Email, TipoUsuario, FotoUsuario FROM Usuario WHERE ID_Usuario = ?",
        [id],
        (err, results) => {
          if (err)
            return res.status(500).json({ error: "Erro ao buscar usuário" });

          const updatedUser = results[0];

          const token = jwt.sign(
            {
              ID_Usuario: updatedUser.ID_Usuario,
              Nome: updatedUser.NomeUsuario,
              Email: updatedUser.Email,
              TipoUsuario: updatedUser.TipoUsuario,
              Foto: updatedUser.FotoUsuario,
            },
            "pingo123",
            { expiresIn: "1h" }
          );

          res.json({
            message: "Perfil atualizado com sucesso",
            user: updatedUser,
            token,
          });
        }
      );
    }
  );
});

/// -> Proprietario

//Rota que verifica o Login do Proprietario
app.get("/login-proprietario/:id", async (req, res) => {
  const { id } = req.params;

  // Verifica se o ID é um número positivo
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: "ID inválido",
      details: "O ID deve ser um número positivo",
    });
  }

  try {
    // Verifica se o usuário existe
    const [userExists] = await db
      .promise()
      .query("SELECT ID_Usuario FROM Usuario WHERE ID_Usuario = ?", [id]);

    if (userExists.length === 0) {
      return res.status(404).json({
        error: "Usuário não encontrado",
        details: `O ID ${id} não existe no sistema`,
      });
    }

    //Verifica se é proprietário
    const [results] = await db
      .promise()
      .query(
        "SELECT ID_Usuario, TipoUsuario FROM Usuario WHERE ID_Usuario = ? AND TipoUsuario = 'Proprietario'",
        [id]
      );

    res.json({
      isProprietario: results.length > 0,
      userId: results[0]?.ID_Usuario || null,
    });
  } catch (err) {
    console.error("Erro ao verificar proprietário:", err);
    res.status(500).json({
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === "development" ? err.message : null,
    });
  }
});

// Rota que vai obter as Quadras daquele Proprietario especifico
app.get("/quadras-proprietario/:proprietarioId", (req, res) => {
  const { proprietarioId } = req.params;
  db.query(
    `SELECT 
      q.*,
      qp.ContatoTelefone,
      qp.ContatoEmail,
      qp.HorarioDisponiveis,
      u.NomeUsuario as NomeProprietario,
      e.Nome as Esporte 
    FROM Quadra q
    JOIN QuadraPrivada qp ON q.ID_Quadra = qp.ID_Quadra
    JOIN Usuario u ON qp.ID_Proprietario = u.ID_Usuario
    LEFT JOIN QuadraEsportes qe ON q.ID_Quadra = qe.ID_Quadra
    LEFT JOIN Esportes e ON qe.ID_Esporte = e.ID_Esporte
    WHERE qp.ID_Proprietario = ?`,
    [proprietarioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter quadras do proprietário:", err);
        return res.status(500).send("Erro ao obter quadras do proprietário");
      }
      res.json(results);
    }
  );
});

/// Menu Dinamico
app.get("/menu/:tipoUsuario", (req, res) => {
  const { tipoUsuario } = req.params;

  db.query(
    `
    SELECT 
      m.ID_MenuItem as id,
      m.Titulo as title,
      m.URL as url,
      m.Icone as icon,
      m.TipoUsuarioPermitido as role
    FROM MenuItems m
    WHERE m.TipoUsuarioPermitido = ?
    ORDER BY m.OrdemExibicao
  `,
    [tipoUsuario],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter menu:", err);
        return res.status(500).send("Erro ao obter menu");
      }

      const menuFormatado = formatarMenu(results);
      res.json(menuFormatado);
    }
  );
});

function formatarMenu(items) {
  const categorias = {
    Main: { id: 1, title: "Main", listItems: [] },
    Usuários: { id: 2, title: "Usuários", listItems: [] },
    Quadras: { id: 3, title: "Quadras", listItems: [] },
    "Área Proprietario": { id: 4, title: "Área Proprietario", listItems: [] },
    Configurações: { id: 5, title: "Configurações", listItems: [] },
  };

  items.forEach((item) => {
    if (item.title.includes("Home")) {
      categorias["Main"].listItems.push(item);
    }
    if (item.title.includes("Usuários")) {
      categorias["Usuários"].listItems.push(item);
    }
    if (item.title.includes("Proprietario")) {
      categorias["Usuários"].listItems.push(item);
    }
    if (item.title.includes("Quadras Públicas")) {
      categorias["Quadras"].listItems.push(item);
    }
    if (item.title.includes("Quadras Privadas")) {
      categorias["Quadras"].listItems.push(item);
    }
    if (item.title.includes("Formulários")) {
      categorias["Quadras"].listItems.push(item);
    }
    if (item.title.includes("Configurações")) {
      categorias["Configurações"].listItems.push(item);
    }
    if (item.title.includes("Minhas Quadras")) {
      categorias["Área Proprietario"].listItems.push(item);
    }
    if (item.title.includes("Gerenciamento de Dias e Horários")) {
      categorias["Área Proprietario"].listItems.push(item);
    }
    if (item.title.includes("Reservas")) {
      categorias["Área Proprietario"].listItems.push(item);
    }
  });

  return Object.values(categorias).filter((cat) => cat.listItems.length > 0);
}

/// Atualizar Senha
app.put("/perfil/senha/:id", (req, res) => {
  const { id } = req.params;
  const { senhaAntiga, novaSenha } = req.body;

  //Verifica se a senha antiga está correta
  db.query(
    "SELECT Senha FROM Usuario WHERE ID_Usuario = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar senha:", err);
        return res.status(500).json({ error: "Erro ao verificar senha" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const senhaAtual = results[0].Senha;

      if (senhaAntiga !== senhaAtual) {
        return res.status(401).json({ error: "Senha atual incorreta" });
      }

      //Atualiza para a nova senha
      db.query(
        "UPDATE Usuario SET Senha = ? WHERE ID_Usuario = ?",
        [novaSenha, id],
        (err, result) => {
          if (err) {
            console.error("Erro ao atualizar senha:", err);
            return res.status(500).json({ error: "Erro ao atualizar senha" });
          }

          res.json({ message: "Senha Atualiza com sucesso" });
        }
      );
    }
  );
});

///Sessão para Atualizar Foto Usuario

// Configura o Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/usuarios/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const usuarioId = req.params.id || req.user?.ID_Usuario;
    const ext = path.extname(file.originalname);
    cb(null, `usuario_${usuarioId}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    //Verificação mais rigorosa
    const isMimeTypeValid = allowedTypes.includes(file.mimetype);
    const isExtValid = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);

    if (!isMimeTypeValid || !isExtValid) {
      req.fileValidationError =
        "Tipo de arquivo não permitido. Use apenas JPEG, PNG ou WebP";
      return cb(null, false, new Error(req.fileValidationError));
    }

    //Verificação para arquivos corrompidos
    if (file.size === 0) {
      req.fileValidationError = "Arquivo corrompido ou vazio";
      return cb(null, false, new Error(req.fileValidationError));
    }

    cb(null, true);
  },
});

//Middleware para processar a imagem com sharp

const processImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filePath = path.join(req.file.destination, req.file.filename);

    //Otimiza a imagem, redimensiona e converte
    await sharp(filePath)
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(filePath + ".processed")
      .then(() => {
        //Substitui o arquivo original pelo processado
        fs.unlinkSync(filePath);
        fs.renameSync(filePath + ".processed", filePath);
        next();
      });
  } catch (err) {
    console.error("Erro no processamento da imagem:", err);
    //remove o arquivo se não passar na verificação
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: "Erro ao proecessar imagem" });
  }
};

const getFullImageUrl = (filename) => {
  return `http://localhost:5000/uploads/usuarios/${filename}`;
};

//Rota para upload de foto do usuário
app.put(
  "/usuario/foto/:id",
  upload.single("foto"),
  processImage,
  async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ error: req.fileValidationError || "Nenhuma imagem enviada" });
    }

    try {
      const fullUrl = getFullImageUrl(file.filename);

      //Busca a foto atual para exclusão
      const [results] = await db
        .promise()
        .query("SELECT FotoUsuario FROM Usuario WHERE ID_Usuario = ?", [id]);

      const fotoAtual = results[0]?.FotoUsuario;

      //Remove a foto antiga se existit
      if (fotoAtual) {
        const filename = path.basename(fotoAtual);
        const filePath = path.join("uploads", "usuarios", filename);

        if ((fs, fs.existsSync(filePath))) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error("Erro ao remover foto antiga:", err);
          }
        }
      }

      // Atualiza o banco com o novo caminho

      await db
        .promise()
        .query("UPDATE Usuario SET FotoUsuario = ? WHERE ID_Usuario = ?", [
          fullUrl,
          id,
        ]);

      // Busca os dados atualizados para gerar novo token
      const [updatedResults] = await db
        .promise()
        .query(
          "SELECT ID_Usuario, NomeUsuario, Email, TipoUsuario, FotoUsuario FROM Usuario WHERE ID_Usuario = ?",
          [id]
        );

      const updatedUser = updatedResults[0];

      const token = jwt.sign(
        {
          ID_Usuario: updatedUser.ID_Usuario,
          Nome: updatedUser.NomeUsuario,
          Email: updatedUser.Email,
          TipoUsuario: updatedUser.TipoUsuario,
          Foto: updatedUser.FotoUsuario,
        },
        "pingo123",
        { expiresIn: "1h" }
      );

      res.json({
        message: "Foto atualizado com sucesso",
        fotoUrl: updatedUser.FotoUsuario,
        token,
      });
    } catch (err) {
      console.error("Erro no processo de upload:", err);

      //Remove o arquivo enviado em caso de erro
      if (file && file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      res.status(500).json({
        error: "Erro interno no servidor",
        details: process.env.NODE_ENV === "development" ? err.message : null,
      });
    }
  }
);

/// Sessão Atualizar Foto Quadra (Publica e Privada)

//Configuração do Multer para Quadras
const storageQuadras = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/quadras/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const quadraId = req.params.id;
    const ext = path.extname(file.originalname);
    cb(null, `quadra_${quadraId}${ext}`);
  },
});

const uploadQuadra = multer({
  storage: storageQuadras,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    const isMimeTypeValid = allowedTypes.includes(file.mimetype);
    const isExtValid = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);

    if (!isMimeTypeValid || !isExtValid) {
      req.fileValidationError =
        "Tipo de arquivo não permitido. Use apenas JPEG, PNG ou WEBP";
      return cb(null, false, new Error(req.fileValidationError));
    }

    if (file.size === 0) {
      req.fileValidationError = "Arquivo corrompido ou vazio";
      return cb(null, false, new Error(req.fileValidationError));
    }

    cb(null, true);
  },
});

// Middleware para processar imagem da quadra
const processQuadraImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filePath = path.join(req.file.destination, req.file.filename);

    await sharp(filePath)
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(filePath + ".processed")
      .then(() => {
        fs.unlinkSync(filePath);
        fs.renameSync(filePath + ".processed", filePath);
        next();
      });
  } catch (err) {
    console.error("Erro no processamento da imagem da quadra:", err);
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res
      .status(500)
      .json({ error: "Erro ao processar imagem da quadra" });
  }
};

const getFullQuadraImageUrl = (filename) => {
  return `http://localhost:5000/uploads/quadras/${filename}`;
};

//Rota para upload de foto da quadra (funciona para ambos tipos)
app.put(
  "/quadra/foto/:id",
  uploadQuadra.single("foto"),
  processQuadraImage,
  async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ error: req.fileValidationError || "Nenhuma imagem enviada" });
    }

    try {
      const fullUrl = getFullQuadraImageUrl(file.filename);

      // Busca a foto atual para exclusão
      const [results] = await db
        .promise()
        .query("SELECT Foto FROM Quadra WHERE ID_Quadra = ?", [id]);
      const fotoAtual = results[0]?.Foto;

      // Remove a foto antiga se existir
      if (fotoAtual) {
        const filename = path.basename(fotoAtual);
        const filePath = path.join("uploads", "quadras", filename);

        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error("Erro ao remover foto antiga da quadra:", err);
          }
        }
      }

      // Atualiza o banco com novo caminho
      await db
        .promise()
        .query("UPDATE Quadra SET Foto = ? WHERE ID_Quadra = ?", [fullUrl, id]);

      // Busca os dados atualizados
      const [updatedResults] = await db
        .promise()
        .query("SELECT * FROM Quadra WHERE ID_Quadra = ?", [id]);

      res.json({
        message: "Foto da quadra atualizada com sucesso",
        fotoUrl: updatedResults[0].Foto,
      });
    } catch (err) {
      console.error("Erro no processo de upload da quadra:", err);

      if (file && file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      res.status(500).json({
        error: "Erro interno no servidor",
        details: process.env.NODE_ENV === "development" ? err.message : null,
      });
    }
  }
);

/// Sessão para Gráficos

//Gráfico Pizza contagem de usuários por tipo
app.get("/dashboard/users-type", (req, res) => {
  db.query(
    `
    SELECT
      TipoUsuario as name,
      COUNT(*) as value,
      CASE
        WHEN TipoUsuario = 'Admin' THEN '#7D5BA6'
        WHEN TipoUsuario = 'Proprietario' THEN '#E96969'
        ELSE '#4E94FF'
      END as color
    FROM Usuario
    GROUP BY TipoUsuario
  `,
    (err, results) => {
      if (err) {
        console.error("Erro ao obter contagem de usuários:", err);
        return res.status(500).send("Erro ao obter contagem de usuários");
      }

      // Mapea os tipos pelos nomes escolhidos
      const data = results.map((item) => {
        let name;
        switch (item.name) {
          case "Admin":
            name = "Admins";
            break;
          case "Proprietario":
            name = "Proprietarios";
            break;
          default:
            name = "Usuarios";
        }
        return { ...item, name };
      });

      res.json(data);
    }
  );
});

//Gráfico que obtém dados da quadra pública
app.get("/dashboard/quadras-publicas", (req, res) => {
  //Consulta que obtem o total de quadras publicas
  db.query(
    `
    SELECT
      COUNT(*) as totalQuadras,
      SUM(CASE WHEN MONTH(DataCriacao) = MONTH(CURRENT_DATE()) THEN 1 ELSE 0 END) as quadrasEsteMes
      FROM Quadra
      WHERE TipoQuadra = 0
      `,
    (err, totalResults) => {
      if (err) {
        console.error("Erro ao obter total de quadras:", err);
        return res.status(500).send("Erro ao obter total de quadras");
      }

      //Consultá para obter quadras criadas por mês (últimos 3 meses)
      db.query(
        `
          SELECT
          MONTHNAME(DataCriacao) as name,
          COUNT(*) as quadras
        FROM Quadra
        WHERE TipoQuadra = 0
          AND DataCriacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH)
        GROUP BY MONTH(DataCriacao), MONTHNAME(DataCriacao)
        ORDER BY MONTH(DataCriacao)
        `,
        (err, monthlyResults) => {
          if (err) {
            console.error("Erro ao obter quadras por mês:", err);
            return res.status(500).send("Erro ao obter quadras por mês");
          }

          //Calcula a porcentagem de crescimento
          const totalQuadras = totalResults[0].totalQuadras;
          const quadrasEsteMes = totalResults[0].quadrasEsteMes;
          const ultimoMes =
            monthlyResults.length > 1
              ? monthlyResults[monthlyResults.length - 2].quadras
              : 0;

          const porcentagem =
            ultimoMes > 0
              ? Math.round(((quadrasEsteMes - ultimoMes) / ultimoMes) * 100)
              : 100;

          res.json({
            totalQuadras,
            porcentagem,
            chartData: monthlyResults,
          });
        }
      );
    }
  );
});

//Gráfico que obtém dados da quadra privada
app.get("/dashboard/quadras-privadas", (req, res) => {
  //Consulta que obtem o total de quadras publicas
  db.query(
    `
    SELECT
      COUNT(*) as totalQuadras,
      SUM(CASE WHEN MONTH(DataCriacao) = MONTH(CURRENT_DATE()) THEN 1 ELSE 0 END) as quadrasEsteMes
      FROM Quadra
      WHERE TipoQuadra = 1
      `,
    (err, totalResults) => {
      if (err) {
        console.error("Erro ao obter total de quadras:", err);
        return res.status(500).send("Erro ao obter total de quadras");
      }

      //Consultá para obter quadras criadas por mês (últimos 3 meses)
      db.query(
        `
          SELECT
          MONTHNAME(DataCriacao) as name,
          COUNT(*) as quadras
        FROM Quadra
        WHERE TipoQuadra = 1
          AND DataCriacao >= DATE_SUB(CURRENT_DATE(), INTERVAL 3 MONTH)
        GROUP BY MONTH(DataCriacao), MONTHNAME(DataCriacao)
        ORDER BY MONTH(DataCriacao)
        `,
        (err, monthlyResults) => {
          if (err) {
            console.error("Erro ao obter quadras por mês:", err);
            return res.status(500).send("Erro ao obter quadras por mês");
          }

          //Calcula a porcentagem de crescimento
          const totalQuadras = totalResults[0].totalQuadras;
          const quadrasEsteMes = totalResults[0].quadrasEsteMes;
          const ultimoMes =
            monthlyResults.length > 1
              ? monthlyResults[monthlyResults.length - 2].quadras
              : 0;

          const porcentagem =
            ultimoMes > 0
              ? Math.round(((quadrasEsteMes - ultimoMes) / ultimoMes) * 100)
              : 100;

          res.json({
            totalQuadras,
            porcentagem,
            chartData: monthlyResults,
          });
        }
      );
    }
  );
});

//Gráfico onde vai conter o Total de Usuários
app.get("/dashboard/total-usuarios", (req, res) => {
  db.query(
    `
    SELECT
      COUNT(*) as totalUsuarios,
      SUM(CASE WHEN MONTH(DataCriacao) = MONTH(CURRENT_DATE()) AND YEAR(DataCriacao) = YEAR(CURRENT_DATE()) THEN 1 ELSE 0 END) as usuariosEsteMes
    FROM Usuario
    `,
    (err, totalResults) => {
      if (err) {
        console.error("Erro ao obter total de usuários:", err);
        return res.status(500).send("Erro ao obter total de usuários");
      }

      //Consulta que obtém os usários criados nos últimos 3 meses
      db.query(
        `
        SELECT
        MONTHNAME(DataCriacao) as name,
        MONTH(DataCriacao) as monthNum, /* Adiciona o número do mês para facilitar o cálculo da porcentagem */
        YEAR(DataCriacao) as yearNum, /* Adiciona o ano para lidar com virada de ano */
        COUNT(*) as usuarios
      FROM Usuario
      WHERE DataCriacao >= DATE_FORMAT(DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH), '%Y-%m-01')
      GROUP BY YEAR(DataCriacao), MONTH(DataCriacao), MONTHNAME(DataCriacao)
      ORDER BY YEAR(DataCriacao), MONTH(DataCriacao)
      `,
        (err, monthlyResults) => {
          if (err) {
            console.error("Erro ao obter usuários por mês:", err);
            return res.status(500).send("Erro ao obter usuários por mês");
          }

          //Calcula porcentagem de crescimento
          const totalUsuarios = totalResults[0].totalUsuarios;
          const usuariosEsteMes = totalResults[0].usuariosEsteMes;

          //Encontra o número de usuários nno mês anterior
          let usuariosMesAnterior = 0;
          const currentMonth = new Date().getMonth() + 1;
          const currentYear = new Date().getFullYear();

          const monthlyDataMap = {};
          monthlyResults.forEach((item) => {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            const monthIndex = monthNames.findIndex((name) =>
              name
                .toLowerCase()
                .startsWith(item.name.toLowerCase().substring(0, 3))
            );
            if (monthIndex !== -1) {
              monthlyDataMap[monthIndex + 1] = item.usuarios; // Store by month number
            }
          });

          //Calcula o mês anterior
          let prevMonth = currentMonth - 1;
          let prevYear = currentYear;
          if (prevMonth === 0) {
            prevMonth = 12;
            prevYear -= 1;
          }

          const prevMonthData = monthlyResults.find(
            (item) => item.monthNum === prevMonth && item.yearNum === prevYear
          );

          if (prevMonthData) {
            usuariosMesAnterior = prevMonthData.usuarios;
          }

          const porcentagem =
            usuariosMesAnterior > 0
              ? Math.round(
                  ((usuariosEsteMes - usuariosMesAnterior) /
                    usuariosMesAnterior) *
                    100
                )
              : usuariosEsteMes > 0
              ? 100
              : 0;

          res.json({
            totalUsuarios,
            porcentagem,
            chartData: monthlyResults,
          });
        }
      );
    }
  );
});

/// -> Horários Quadras

// Rota para salvar configurações de horários
app.post("/quadra/horarios", (req, res) => {
  const {
    quadraId,
    startDate,
    endDate,
    timeSlots,
    price,
    timeInterval,
    proprietarioId,
  } = req.body;

  db.query(
    `SELECT 1 FROM DiasIndisponiveis 
     WHERE ID_Quadra = ? 
     AND (
         (DataInicio BETWEEN ? AND ?) 
         OR (DataFim BETWEEN ? AND ?) 
         OR (? BETWEEN DataInicio AND DataFim) 
         OR (? BETWEEN DataInicio AND DataFim)
     )`,
    [quadraId, startDate, endDate, startDate, endDate, startDate, endDate],
    (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao verificar dias indisponíveis" });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ 
                error: "Existem dias indisponíveis no período selecionado. Remova-os primeiro." 
            });
        }

  // Verifica se o usário é o proprietário da quadra
  db.query(
    `SELECT 1 FROM QuadraPrivada
    WHERE ID_Quadra = ? AND ID_Proprietario = ?`,
    [quadraId, proprietarioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar proprietário:", err);
        return res
          .status(500)
          .json({ error: "Erro ao verificar proprietário" });
      }

      if (results.length === 0) {
        return res.status(403).json({ error: "Acesso não autorizado" });
      }

      // Validação do preço
      if (price === undefined || price === null) {
        return res.status(400).json({ error: "O preço é obrigatório" });
      }

      // Converter para número
      const precoNumerico = Number(price);
      if (isNaN(precoNumerico)) {
        return res.status(400).json({ error: "Preço inválido" });
      }

      // Insere a configuração no BD
      db.query(
        `INSERT INTO HorariosQuadra
        (ID_Quadra, DataInicio, DataFim, Horarios, Preco, Intervalo)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          quadraId,
          startDate,
          endDate,
          JSON.stringify(timeSlots),
          precoNumerico,
          timeInterval,
        ],
        (err, result) => {
          if (err) {
            console.error("Erro ao salvar horários:", err);
            return res.status(500).json({ error: "Erro ao salvar horários" });
          }

          // Atualiza os horários disponíveis na tabela QuadraPrivada
          db.query(
            `UPDATE QuadraPrivada
            SET HorarioDisponiveis = ?
            WHERE ID_Quadra = ?`,
            [JSON.stringify(timeSlots), quadraId],
            (updateErr) => {
              if (updateErr) {
                console.error("Erro ao atualizar horários:", updateErr);
                // Não falha, apenas registra o erro pois a configuração principal foi salva
              }

              res.json({
                message: "Horários configurados com sucesso",
                configId: result.insertId,
              });
            }
          );
        }
      );
    }
  );
});

// Rota para obter as configurações de horários de uma quadra
app.get("/quadra/horarios/:quadraId", (req, res) => {
  const { quadraId } = req.params;

  db.query(
    "SELECT * FROM HorariosQuadra WHERE ID_Quadra = ? ORDER BY DataInicio DESC",
    [quadraId],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter horários:", err);
        return res.status(500).json({ error: "Erro ao obter horários" });
      }

      // Formata os resultados
      const parsedResults = results.map((config) => {
        // Converte as datas para objetos Date
        const dataInicio = new Date(config.DataInicio);
        const dataFim = new Date(config.DataFim);

        // Formata as datas para 'dd/MM/yyyy'
        const formatarData = (date) => {
          const dia = date.getDate().toString().padStart(2, "0");
          const mes = (date.getMonth() + 1).toString().padStart(2, "0");
          const ano = date.getFullYear();
          return `${dia}/${mes}/${ano}`;
        };

        // Formata o intervalo para texto amigável
        const formatarIntervalo = (intervalo) => {
          switch (intervalo) {
            case "30min":
              return "30 minutos";
            case "1h":
              return "1 hora";
            case "2h":
              return "2 horas";
            default:
              return intervalo;
          }
        };

        return {
          ...config,
          DataInicioFormatada: formatarData(dataInicio),
          DataFimFormatada: formatarData(dataFim),
          Horarios: JSON.parse(config.Horarios),
          IntervaloFormatado: formatarIntervalo(config.Intervalo),
        };
      });

      res.json(parsedResults);
    }
  );
}
)
});

// Nova rota para verificar horários ocupados
app.get("/quadra/horarios/ocupados/:quadraId", (req, res) => {
  const { quadraId } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Datas de início e fim são obrigatórias" });
  }

  db.query(
    `SELECT Horarios FROM HorariosQuadra 
     WHERE ID_Quadra = ? 
     AND (
       (DataInicio BETWEEN ? AND ?) 
       OR (DataFim BETWEEN ? AND ?) 
       OR (? BETWEEN DataInicio AND DataFim) 
       OR (? BETWEEN DataInicio AND DataFim)
     )`,
    [quadraId, startDate, endDate, startDate, endDate, startDate, endDate],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar horários ocupados:", err);
        return res
          .status(500)
          .json({ error: "Erro ao buscar horários ocupados" });
      }

      // Extrai todos os horários ocupados
      const occupiedSlots = results.flatMap((config) =>
        JSON.parse(config.Horarios)
      );

      res.json({ occupiedSlots });
    }
  );
});


//// -> Sessão de esportes

// Obter todos os esportes disponíveis
app.get("/esportes", (req, res) => {
  db.query("SELECT * FROM Esportes", (err, results) => {
    if (err) {
      console.error("Erro ao obter esportes:", err);
      return res.status(500).send("Erro ao obter esportes");
    }
    res.json(results);
  });
});

// Obter esporte de uma quadra específica
app.get("/quadraspub/:id/esporte", (req, res) => {
  const { id } = req.params;
  db.query(`
    SELECT e.Nome 
    FROM QuadraEsportes qe
    JOIN Esportes e ON qe.ID_Esporte = e.ID_Esporte
    WHERE qe.ID_Quadra = ?
  `, [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter esporte da quadra:", err);
      return res.status(500).send("Erro ao obter esporte da quadra");
    }
    res.json(results[0] || null);
  });
});

// Atualizar esporte de uma quadra
app.put("/quadraspub/:id/esporte", (req, res) => {
  const { id } = req.params;
  const { ID_Esporte } = req.body;

  // Primeiro remove qualquer associação existente
  db.query("DELETE FROM QuadraEsportes WHERE ID_Quadra = ?", [id], (err) => {
    if (err) {
      console.error("Erro ao remover esportes da quadra:", err);
      return res.status(500).json({ error: "Erro ao atualizar esporte" });
    }

    // Se foi fornecido um novo esporte, adiciona a associação
    if (ID_Esporte) {
      db.query(
        "INSERT INTO QuadraEsportes (ID_Quadra, ID_Esporte) VALUES (?, ?)",
        [id, ID_Esporte],
        (err) => {
          if (err) {
            console.error("Erro ao adicionar esporte à quadra:", err);
            return res.status(500).json({ error: "Erro ao atualizar esporte" });
          }
          res.json({ message: "Esporte atualizado com sucesso" });
        }
      );
    } else {
      res.json({ message: "Esporte removido com sucesso" });
    }
  });
});


/// -> Sessão Dias Indisponíveis

// Rota para adicionar dias indisponíveis
app.post('/quadra/dias-indisponiveis', (req, res) => {
  const { quadraId, startDate, endDate, motivo, proprietarioId } = req.body;

  // Validações básicas melhoradas
  if (!quadraId || !startDate || !endDate || !proprietarioId) {
    return res.status(400).json({ 
      error: "Dados incompletos",
      requiredFields: ["quadraId", "startDate", "endDate", "proprietarioId"]
    });
  }

  // Verifica formato das datas
  if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
    return res.status(400).json({ error: "Formato de data inválido" });
  }

  // Verifica se a data de início é anterior à data de término
  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({ 
      error: "Data de início não pode ser posterior à data de término",
      startDate,
      endDate
    });
  }

  // Verifica se o usuário é o proprietário da quadra
  db.query(
    `SELECT 1 FROM QuadraPrivada 
     WHERE ID_Quadra = ? AND ID_Proprietario = ?`,
    [quadraId, proprietarioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar proprietário:", err);
        return res.status(500).json({ 
          error: "Erro ao verificar permissões",
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }

      if (results.length === 0) {
        return res.status(403).json({ 
          error: "Acesso não autorizado",
          message: "Você não tem permissão para configurar esta quadra"
        });
      }

      // Verifica conflitos com agendamentos existentes
      db.query(
        `SELECT 1 FROM Agendamento 
         WHERE ID_Quadra = ? 
         AND DataAgendamento BETWEEN ? AND ?`,
        [quadraId, startDate, endDate],
        (err, agendamentos) => {
          if (err) {
            console.error("Erro ao verificar agendamentos:", err);
            return res.status(500).json({ 
              error: "Erro ao verificar agendamentos existentes",
              details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
          }

          if (agendamentos.length > 0) {
            return res.status(409).json({ 
              error: "Conflito com agendamentos existentes",
              message: "Existem agendamentos neste período. Cancele-os primeiro.",
              count: agendamentos.length
            });
          }

          // Insere a indisponibilidade no BD
          db.query(
            `INSERT INTO DiasIndisponiveis 
            (ID_Quadra, DataInicio, DataFim, Motivo, ID_Proprietario)
            VALUES (?, ?, ?, ?, ?)`,
            [quadraId, startDate, endDate, motivo || null, proprietarioId],
            (err, result) => {
              if (err) {
                console.error("Erro ao salvar dias indisponíveis:", err);
                return res.status(500).json({ 
                  error: "Erro ao salvar configuração",
                  details: process.env.NODE_ENV === 'development' ? err.message : undefined,
                  sqlError: process.env.NODE_ENV === 'development' ? err.sqlMessage : undefined
                });
              }

              res.json({
                success: true,
                message: "Dias indisponíveis configurados com sucesso",
                indisponibilidadeId: result.insertId,
                quadraId,
                periodo: `${startDate} até ${endDate}`
              });
            }
          );
        }
      );
    }
  );
});


app.post('/quadra/verificar-indisponibilidade/:quadraId', (req, res) => {
  const { quadraId } = req.params;
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Datas são obrigatórias" });
  }

  // Verifica sobreposição com dias indisponíveis existentes
  db.query(
    `SELECT 1 FROM DiasIndisponiveis 
     WHERE ID_Quadra = ? 
     AND (
       (? BETWEEN DataInicio AND DataFim) OR
       (? BETWEEN DataInicio AND DataFim) OR
       (DataInicio BETWEEN ? AND ?) OR
       (DataFim BETWEEN ? AND ?)
     )`,
    [quadraId, startDate, endDate, startDate, endDate, startDate, endDate],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar indisponibilidade:", err);
        return res.status(500).json({ error: "Erro ao verificar disponibilidade" });
      }

      res.json({ 
        existeIndisponibilidade: results.length > 0,
        mensagem: results.length > 0 ? "Já existe indisponibilidade para este período" : "Período disponível"
      });
    }
  );
});

app.get('/quadra/dias-indisponiveis/:quadraId', (req, res) => {
  const { quadraId } = req.params;

  // Validação do ID da quadra
  if (!quadraId || isNaN(quadraId)) {
    return res.status(400).json({ error: "ID da quadra inválido" });
  }

  db.query(
    `SELECT di.*, q.NomeQuadra 
     FROM DiasIndisponiveis di
     JOIN Quadra q ON di.ID_Quadra = q.ID_Quadra
     WHERE di.ID_Quadra = ? 
     ORDER BY di.DataInicio DESC`,
    [quadraId],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter dias indisponíveis:", err);
        return res.status(500).json({ 
          error: "Erro no servidor ao buscar dias indisponíveis",
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }

      try {
        // Formata os resultados
        const parsedResults = results.map(config => ({
          ...config,
          DataInicioFormatada: formatDateToBR(config.DataInicio),
          DataFimFormatada: formatDateToBR(config.DataFim),
          NomeQuadra: config.NomeQuadra
        }));

        res.json(parsedResults);
      } catch (formatError) {
        console.error("Erro ao formatar resultados:", formatError);
        res.status(500).json({ error: "Erro ao processar dados" });
      }
    }
  );
});



// Rota para verificar conflitos de agendamento
app.get('/quadra/verificar-disponibilidade/:quadraId', (req, res) => {
  const { quadraId } = req.params;
  const { data } = req.query;

  if (!data) {
      return res.status(400).json({ error: "Data é obrigatória" });
  }

  // Primeiro verifica dias indisponíveis (prioridade máxima)
  db.query(
      `SELECT 1 FROM DiasIndisponiveis 
       WHERE ID_Quadra = ? 
       AND ? BETWEEN DataInicio AND DataFim`,
      [quadraId, data],
      (err, indisponivelResults) => {
          if (err) {
              console.error("Erro ao verificar disponibilidade:", err);
              return res.status(500).json({ error: "Erro ao verificar disponibilidade" });
          }

          if (indisponivelResults.length > 0) {
              return res.json({ 
                  disponivel: false,
                  motivo: "Dia marcado como indisponível pelo proprietário"
              });
          }

          // Se não estiver indisponível, verifica agendamentos
          db.query(
              `SELECT 1 FROM Agendamento 
               WHERE ID_Quadra = ? 
               AND DATE(DataAgendamento) = ?`,
              [quadraId, data],
              (err, agendamentoResults) => {
                  if (err) {
                      console.error("Erro ao verificar agendamentos:", err);
                      return res.status(500).json({ error: "Erro ao verificar agendamentos" });
                  }

                  res.json({ 
                      disponivel: agendamentoResults.length === 0,
                      motivo: agendamentoResults.length > 0 ? "Já existem agendamentos neste dia" : null
                  });
              }
          );
      }
  );
});


// Função auxiliar para formatar data
function formatDateToBR(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


/// -> Rotas para Controle de Horarios e Dias Indisponiveis

// Rota para deletar horários disponíveis
app.delete("/quadra/horarios/:configId", (req, res) => {
  const { configId } = req.params;
  const { proprietarioId } = req.body;

  // Verifica se o usuário é o proprietário
  db.query(
    `SELECT qp.ID_Proprietario 
     FROM HorariosQuadra hq
     JOIN QuadraPrivada qp ON hq.ID_Quadra = qp.ID_Quadra
     WHERE hq.ID_Config = ?`,
    [configId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar permissões" });
      }

      if (results.length === 0 || results[0].ID_Proprietario != proprietarioId) {
        return res.status(403).json({ error: "Acesso não autorizado" });
      }

      // Deleta o registro
      db.query(
        `DELETE FROM HorariosQuadra WHERE ID_Config = ?`,
        [configId],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Erro ao deletar configuração" });
          }

          res.json({ success: true, message: "Configuração deletada com sucesso" });
        }
      );
    }
  );
});

// Rota para deletar dias indisponíveis
app.delete("/quadra/dias-indisponiveis/:indisponibilidadeId", (req, res) => {
  const { indisponibilidadeId } = req.params;
  const { proprietarioId } = req.body;

  // Verifica se o usuário é o proprietário
  db.query(
    `SELECT ID_Proprietario FROM DiasIndisponiveis WHERE ID_Indisponibilidade = ?`,
    [indisponibilidadeId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao verificar permissões" });
      }

      if (results.length === 0 || results[0].ID_Proprietario != proprietarioId) {
        return res.status(403).json({ error: "Acesso não autorizado" });
      }

      // Deleta o registro
      db.query(
        `DELETE FROM DiasIndisponiveis WHERE ID_Indisponibilidade = ?`,
        [indisponibilidadeId],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Erro ao deletar dia indisponível" });
          }

          res.json({ success: true, message: "Dia indisponível deletado com sucesso" });
        }
      );
    }
  );
});

// Rota para obter todas as configurações de horários (para o gerenciador)
app.get("/quadra/horarios-admin", (req, res) => {
  const { proprietarioId } = req.query;

  if (!proprietarioId) {
    return res.status(400).json({ error: "ID do proprietário é obrigatório" });
  }

  db.query(
    `SELECT hq.*, q.NomeQuadra 
     FROM HorariosQuadra hq
     JOIN QuadraPrivada qp ON hq.ID_Quadra = qp.ID_Quadra
     JOIN Quadra q ON hq.ID_Quadra = q.ID_Quadra
     WHERE qp.ID_Proprietario = ?
     ORDER BY hq.DataInicio DESC`,
    [proprietarioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter horários:", err);
        return res.status(500).json({ error: "Erro ao obter horários" });
      }

      // Formata os resultados
      const parsedResults = results.map((config) => {
        return {
          ...config,
          DataInicioFormatada: formatDateToBR(config.DataInicio),
          DataFimFormatada: formatDateToBR(config.DataFim),
          Horarios: typeof config.Horarios === 'string' ? 
                   JSON.parse(config.Horarios) : 
                   config.Horarios,
          PrecoFormatado: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(config.Preco)
        };
      });

      res.json(parsedResults);
    }
  );
});


// Rota para obter todos os dias indisponíveis (para o gerenciador admin)
app.get("/quadra/dias-indisponiveis-admin", (req, res) => {
  const { proprietarioId } = req.query;

  if (!proprietarioId) {
    return res.status(400).json({ error: "ID do proprietário é obrigatório" });
  }

  db.query(
    `SELECT di.*, q.NomeQuadra 
     FROM DiasIndisponiveis di
     JOIN QuadraPrivada qp ON di.ID_Quadra = qp.ID_Quadra
     JOIN Quadra q ON di.ID_Quadra = q.ID_Quadra
     WHERE qp.ID_Proprietario = ?
     ORDER BY di.DataInicio DESC`,
    [proprietarioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao obter dias indisponíveis:", err);
        return res.status(500).json({ error: "Erro ao obter dias indisponíveis" });
      }

      // Formata os resultados
      const parsedResults = results.map((item) => ({
        ...item,
        DataInicioFormatada: formatDateToBR(item.DataInicio),
        DataFimFormatada: formatDateToBR(item.DataFim),
        NomeQuadra: item.NomeQuadra || `Quadra ${item.ID_Quadra}`
      }));

      res.json(parsedResults);
    }
  );
});


/// Sessão Reservas
// Backend - ajuste a rota para retornar campos separados
app.get('/proprietario/agendamentos/:proprietarioId', (req, res) => {
  const { proprietarioId } = req.params;

  db.query(`
      SELECT 
          a.ID_Agendamento as id,
          u.NomeUsuario as name,
          q.NomeQuadra as quadra,
          q.EnderecoQuadra as endereco,
          DATE(a.DataHoraInicio) as dia,
          TIME(a.DataHoraInicio) as horario_inicio,
          TIME(a.DataHoraFim) as horario_fim,
          a.Preco,
          sp.StatusPagamento as status
      FROM Agendamento a
      JOIN Quadra q ON a.ID_Quadra = q.ID_Quadra
      JOIN QuadraPrivada qp ON q.ID_Quadra = qp.ID_Quadra
      JOIN Usuario u ON a.ID_Usuario = u.ID_Usuario
      JOIN StatusPagamento sp ON a.ID_StatusPagamento = sp.ID_StatusPagamento
      WHERE qp.ID_Proprietario = ?
      ORDER BY a.DataHoraInicio DESC
  `, [proprietarioId], (err, results) => {
      if (err) {
          console.error("Erro ao buscar agendamentos:", err);
          return res.status(500).json({ error: "Erro ao buscar agendamentos" });
      }

      // Formatar datas e preços
      const formattedResults = results.map(agendamento => ({
          ...agendamento,
          dia: formatDate(agendamento.dia),
          horario_inicio: formatTime(agendamento.horario_inicio),
          horario_fim: formatTime(agendamento.horario_fim),
          Preco: new Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
          }).format(agendamento.Preco)
      }));

      res.json(formattedResults);
  });
});

// Funções auxiliares atualizadas
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

function formatTime(timeStr) {
  return timeStr.substring(0, 5); // Retorna apenas HH:MM
}


//Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na rota ${port}`);
});
