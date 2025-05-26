const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const process = require('process');
const sharp = require('sharp')
//Middleware que permite Cors e tratamento de Json
app.use(cors({
  origin: 'http://localhost:5173', // ou seu domínio de produção
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
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
  db.query("SELECT * FROM Quadra WHERE TipoQuadra = ?", [0], (err, results) => {
    if (err) {
      console.error("Erro ao obter quadras:", err);
      return res.status(500).send("Erro ao obter quadras");
    }
    res.json(results);
  });
});

// Rota para criar uma nova quadra publica
app.post("/quadraspub", (req, res) => {
  const { NomeQuadra, EnderecoQuadra, Bairro, Cidade } = req.body;
  db.query(
    "INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Bairro, Cidade) VALUES (?,?,?,?)",
    [NomeQuadra, EnderecoQuadra, Bairro, Cidade],
    (err, result) => {
      if (err) throw err;
      res.json({
        ID_Quadra: result.insertId,
        NomeQuadra,
        EnderecoQuadra,
        Bairro,
        Cidade,
      });
    }
  );
});

//Rota para atualizar uma quadra pública existente
app.put("/quadraspub/att/:id", (req, res) => {
  const { id } = req.params;
  const { NomeQuadra, EnderecoQuadra, Bairro, Cidade } = req.body;

  db.query(
    "UPDATE Quadra SET NomeQuadra = ?, EnderecoQuadra = ?, Bairro = ?, Cidade = ? WHERE ID_Quadra = ?",
    [NomeQuadra, EnderecoQuadra, Bairro, Cidade, id],
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
        Bairro,
        Cidade,
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
  db.query("SELECT * FROM Quadra WHERE TipoQuadra = ?", [1], (err, results) => {
    if (err) {
      console.error("Erro ao obter quadras:", err);
      return res.status(500).send("Erro ao obter quadras");
    }
    res.json(results);
  });
});

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

// Single Page Quadra Privada
app.get("/quadraspriv/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Recebida requisição para quadra privada ID: ${id}`);

  db.query(`
    SELECT 
      q.ID_Quadra,
      q.NomeQuadra,
      q.EnderecoQuadra,
      q.Bairro,
      q.Cidade,
      q.Foto,
      q.TipoQuadra,
      q.DataCriacao,
      qp.ValorHora,
      qp.HorarioDisponiveis,
      qp.Contato,
      qp.ID_Proprietario,
      u.NomeUsuario as NomeProprietario
    FROM Quadra q
    JOIN QuadraPrivada qp ON q.ID_Quadra = qp.ID_Quadra
    JOIN Usuario u ON qp.ID_Proprietario = u.ID_Usuario
    WHERE q.ID_Quadra = ?
  `, [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter quadra privada:", err);
      return res.status(500).json({ 
        error: "Erro ao obter quadra privada",
        details: err.message
       });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        error: "Quadra não encontrada",
        requestedId: id
      });
    }

    res.json({ results });
  });
});


//Rota para atualizar uma quadra privada existente
app.put("/quadraspriv/att/:id", (req, res) => {
  const { id } = req.params;
  const { NomeQuadra, EnderecoQuadra, Bairro, Cidade, ValorHora, HorarioDisponiveis, Contato } = req.body;
  //First Table Quadra
  db.query( 
    "UPDATE Quadra SET NomeQuadra = ?, EnderecoQuadra = ?, Bairro = ?, Cidade = ? WHERE ID_Quadra = ?",
    [NomeQuadra, EnderecoQuadra, Bairro, Cidade, id],
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar quadra:", err);
        return res.status(500).json({ error: "Erro ao atualizar quadra" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Quadra não encontrada" });
      }

      //Second Table QuadraPrivada
      db.query(
        "UPDATE QuadraPrivada SET ValorHora = ?, HorarioDisponiveis = ?, Contato = ? WHERE ID_Quadra = ?",
        [ValorHora, HorarioDisponiveis, Contato, id],
        (err, result) => {
          if (err) {
            console.error("Erro ao atualizar quadra privada:", err);
            return res.status(500).json({ error: "Erro ao atualizar quadra privada" });
          }

          res.json({
            ID_Quadra: id,
            NomeQuadra,
            EnderecoQuadra,
            Bairro,
            Cidade,
            ValorHora,
            HorarioDisponiveis,
            Contato,
            message: "Quadra atualizada com sucesso",
          });
        }
      );
    }
  );
});

app.post("/quadrapriv/registre", (req, res) => {
  const { NomeQuadra, EnderecoQuadra, Bairro, Cidade, ValorHora, HorarioDisponiveis, Contato,  ID_Proprietario } = req.body;

  //First create quadra in table Quadra
  db.query(
    "INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Bairro, Cidade, TipoQuadra) VALUES (?,?,?,?,1)",
    [NomeQuadra, EnderecoQuadra, Bairro, Cidade],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar quadra:", err);
        return res.status(500).send("Erro ao criar quadra");
      }

      const quadraId = result.insertId;

      //Second create QuadraPrivada
      db.query(
        "INSERT INTO QuadraPrivada (ID_Quadra, HorarioDisponiveis, ValorHora, Contato, ID_Proprietario ) VALUES (?,?,?,?,?)",
        [quadraId, HorarioDisponiveis, ValorHora, Contato, ID_Proprietario],
        (err,result) => {
          if (err) {
            console.error("Erro ao criar quadra privada:", err);
            return res.status(500).send("Erro ao criar quadra privada");
          }

          res.json({
            ID_Quadra: quadraId,
            NomeQuadra,
            EnderecoQuadra,
            Bairro,
            Cidade,
            ValorHora,
            HorarioDisponiveis,
            Contato,
            ID_Proprietario
          });
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

      const tempoExpiracao = manterConectado ? '72h' : '1h';
      
      //Gera uma sessão JWT
      const token = jwt.sign(
        {
          ID_Usuario: usuario.ID_Usuario,
          Nome: usuario.NomeUsuario,
          Email: usuario.Email,
          TipoUsuario: usuario.TipoUsuario,
          Foto: usuario.FotoUsuario
        },
        'pingo123', //chave JWT
        {expiresIn: tempoExpiracao}
      );
  
  res.json({
    message: "Login bem-sucedido",
    token: token
  });
}
);
});

/// -> Parte Perfil Backend

// Rota para atualizar o perfil do usuário
app.put("/perfil/att/:id", (req,res)=> {
  const {id} = req.params;
  const {Nome, Email} = req.body;

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
        if (err) return res.status(500).json({ error: "Erro ao buscar usuário" });
        
        const updatedUser = results[0];

        const token = jwt.sign(
          {
            ID_Usuario: updatedUser.ID_Usuario,
            Nome: updatedUser.NomeUsuario,
            Email: updatedUser.Email,
            TipoUsuario: updatedUser.TipoUsuario,
            Foto: updatedUser.FotoUsuario
          },
          'pingo123', // em produção, use variável de ambiente
          { expiresIn: '1h' }
        );
        
        res.json({
          message: "Perfil atualizado com sucesso",
          user: updatedUser,
          token
        });        
      }
    );
  }
);
});


/// -> Proprietario

//Rota que verifica o Login do Proprietario
app.get("/login-proprietario/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT ID_Usuario, TipoUsuario FROM Usuario WHERE ID_Usuario = ? AND TipoUsuario = 'Proprietario'",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar proprietário:", err);
        return res.status(500).send("Erro ao verificar proprietário");
      }
      res.json({ isProprietario: results.length > 0 });
    }
  );
});

// Rota que vai obter as Quadras daquele Proprietario especifico
app.get("/quadras-proprietario/:proprietarioId", (req, res) => {
  const {proprietarioId} = req.params;
  db.query(
    `SELECT q.*, qp.ValorHora, qp.HorarioDisponiveis, qp.Contato, u.NomeUsuario as NomeProprietario 
    FROM Quadra q
    JOIN QuadraPrivada qp ON q.ID_Quadra = qp.ID_Quadra
    JOIN Usuario u ON qp.ID_Proprietario = u.ID_Usuario
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
app.get('/menu/:tipoUsuario', (req, res) => {
  const {tipoUsuario} = req.params;

  db.query(`
    SELECT 
      m.ID_MenuItem as id,
      m.Titulo as title,
      m.URL as url,
      m.Icone as icon,
      m.TipoUsuarioPermitido as role
    FROM MenuItems m
    WHERE m.TipoUsuarioPermitido = ?
    ORDER BY m.OrdemExibicao
  `, [tipoUsuario], (err, results) => {
    if (err) {
      console.error("Erro ao obter menu:", err);
      return res.status(500).send("Erro ao obter menu");
    }

    const menuFormatado = formatarMenu(results);
    res.json(menuFormatado);
  });
});

function formatarMenu(items) {
  const categorias = {
    "Main": { id: 1, title: "Main", listItems: [] },
    "Usuários": { id: 2, title: "Usuários", listItems: [] },
    "Quadras": { id: 3, title: "Quadras", listItems: [] },
    "Área Proprietario": { id: 4, title: "Área Proprietario", listItems: [] },
    "Configurações": { id: 5, title: "Configurações", listItems: [] }
  };

  items.forEach(item =>{
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
    if (item.title.includes("Configurações")) {
      categorias["Configurações"].listItems.push(item);
    }
    if (item.title.includes("Minhas Quadras")) {
      categorias["Área Proprietario"].listItems.push(item);
    }
    if (item.title.includes("Reservas")) {
      categorias["Área Proprietario"].listItems.push(item);
    }
  });

  return Object.values(categorias).filter(cat => cat.listItems.length > 0);
}

/// Atualizar Senha
app.put("/perfil/senha/:id", (req, res) => {
  const {id} = req.params;
  const {senhaAntiga, novaSenha} = req.body;

  //Verifica se a senha antiga está correta
  db.query(
    "SELECT Senha FROM Usuario WHERE ID_Usuario = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao verificar senha:", err);
        return res.status(500).json({ error: "Erro ao verificar senha"});
      }

      if (results.length === 0) {
        return res.status(404).json({error: "Usuário não encontrado"});
      }

      const senhaAtual = results[0].Senha;

      if (senhaAntiga !== senhaAtual) {
        return res.status(401).json({error: "Senha atual incorreta"});
      }

      //Atualiza para a nova senha
      db.query(
        "UPDATE Usuario SET Senha = ? WHERE ID_Usuario = ?",
        [novaSenha, id],
        (err, result) => {
          if (err) {
            console.error("Erro ao atualizar senha:", err);
            return res.status(500).json({ error: "Erro ao atualizar senha"});
          }

          res.json({ message: "Senha Atualiza com sucesso"});
        }
      );
    }
  );
});


///Sessão para Atualizar Foto Usuario

// Configura o Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/usuarios/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true});
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const usuarioId = req.params.id || req.user?.ID_Usuario;
    const ext = path.extname(file.originalname);
    cb(null, `usuario_${usuarioId}${ext}`);
  }
});

const upload = multer ({
  storage: storage,
  limits: {
     fileSize: 5 * 1024 * 1024,
      files: 1,
      fields: 0
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const ext = path.extname(file.originalname).toLowerCase();

      //Verificação mais rigorosa
      const isMimeTypeValid = allowedTypes.includes(file.mimetype);
      const isExtValid = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);

      if (!isMimeTypeValid || !isExtValid) {
        req.fileValidationError = 'Tipo de arquivo não permitido. Use apenas JPEG, PNG ou WebP';
        return cb(null, false, new Error(req.fileValidationError));
      }

      //Verificação para arquivos corrompidos
      if (file.size === 0) {
        req.fileValidationError = 'Arquivo corrompido ou vazio';
        return cb(null, false, new Error(req.fileValidationError));
      }

      cb(null, true);
    }
  });

  //Middleware para processar a imagem com sharp

  const processImage = async (req, res, next) => {
      if (!req.file) return next();

      try {
        const filePath = path.join(req.file.destination, req.file.filename);

        //Otimiza a imagem, redimensiona e converte
        await sharp(filePath)
          .resize(1200, 1200, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ 
            quality: 80, 
            progressive: true,
            mozjpeg: true
          })
          .toFile(filePath + '.processed')
          .then(() => {
            //Substitui o arquivo original pelo processado
            fs.unlinkSync(filePath);
            fs.renameSync(filePath + '.processed', filePath);
            next();
          });
      } catch (err) {
        console.error('Erro no processamento da imagem:', err);
        //remove o arquivo se não passar na verificação
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ error: 'Erro ao proecessar imagem'});
      }
    };

    const getFullImageUrl = (filename) => {
      return `http://localhost:5000/uploads/usuarios/${filename}`;
    }

//Rota para upload de foto do usuário
app.put('/usuario/foto/:id', upload.single('foto'), processImage, async (req,
res) => {
  const {id} = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: req.fileValidationError || 'Nenhuma imagem enviada'});
  }

  try {
    const fullUrl = getFullImageUrl(file.filename);

    //Busca a foto atual para exclusão
    const [results] = await db.promise().query("SELECT FotoUsuario FROM Usuario WHERE ID_Usuario = ?",[id]);

    const fotoAtual = results[0]?.FotoUsuario;

    //Remove a foto antiga se existit
    if (fotoAtual) {
      const filename = path.basename(fotoAtual);
      const filePath = path.join('uploads', 'usuarios', filename);

      if (fs,fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Erro ao remover foto antiga:", err);
        }
      }
    }

    // Atualiza o banco com o novo caminho

    await db.promise().query(
      "UPDATE Usuario SET FotoUsuario = ? WHERE ID_Usuario = ?",
      [fullUrl, id]
    );

    // Busca os dados atualizados para gerar novo token
    const [updatedResults] = await db.promise().query(
      "SELECT ID_Usuario, NomeUsuario, Email, TipoUsuario, FotoUsuario FROM Usuario WHERE ID_Usuario = ?",
      [id]
    );

    const updatedUser = updatedResults[0];

    const token = jwt.sign( 
      {
        ID_Usuario: updatedUser.ID_Usuario,
        Nome: updatedResults.NomeUsuario,
        Email: updatedUser.Email,
        TipoUsuario: updatedUser.TipoUsuario,
        Foto: updatedUser.FotoUsuario
      },
      'pingo123',
      { expiresIn: '1h'}
    );

    res.json({
      message: "Foto atualizado com sucesso",
      fotoUrl: updatedUser.FotoUsuario,
      token
    });

  } catch (err) {
    console.error("Erro no processo de upload:", err);

    //Remove o arquivo enviado em caso de erro
    if (file && file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    res.status(500).json({
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
})
  
/// Sessão Atualizar Foto Quadra (Publica e Privada)

//Configuração do Multer para Quadras
const storageQuadras = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/quadras/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {recursive: true});
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const quadraId = req.params.id;
    const ext = path.extname(file.originalname);
    cb(null, `quadra_${quadraId}${ext}`);
  }
});

const uploadQuadra = multer({
  storage: storageQuadras,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const ext = path.extname(file.originalname).toLowerCase();

    const isMimeTypeValid = allowedTypes.includes(file.mimetype);
    const isExtValid = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);

    if (!isMimeTypeValid || !isExtValid) {
      req.fileValidationError = 'Tipo de arquivo não permitido. Use apenas JPEG, PNG ou WEBP';
      return cb(null, false, new Error(req.fileValidationError));
    }

    if (file.size === 0) {
      req.fileValidationError = 'Arquivo corrompido ou vazio';
      return cb(null, false, new Error(req.fileValidationError));
    }

    cb(null, true);
  }
});

// Middleware para processar imagem da quadra
const processQuadraImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filePath = path.join(req.file.destination, req.file.filename);

    await sharp(filePath)
    .resize(1200, 1200, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({
      quality: 80,
      progressive: true,
      mozjpeg: true
    })
    .toFile(filePath + '.processed')
    .then(() => {
      fs.unlinkSync(filePath);
      fs.renameSync(filePath + '.processed', filePath);
      next();
    });
  } catch (err) {
    console.error('Erro no processamento da imagem da quadra:', err);
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: 'Erro ao processar imagem da quadra'});
  }
};

const getFullQuadraImageUrl = (filename) => {
  return `http://localhost:5000/uploads/quadras/${filename}`;
};

//Rota para upload de foto da quadra (funciona para ambos tipos)
app.put('/quadra/foto/:id', uploadQuadra.single('foto'), processQuadraImage, async (req, res) => {
  const {id} = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({error: req.fileValidationError || 'Nenhuma imagem enviada'});
  }

  try {
    const fullUrl = getFullQuadraImageUrl(file.filename);

    // Busca a foto atual para exclusão
    const [results] = await db.promise().query("SELECT Foto FROM Quadra WHERE ID_Quadra = ?", [id]);
    const fotoAtual = results[0]?.Foto;

    // Remove a foto antiga se existir
    if (fotoAtual) {
      const filename = path.basename(fotoAtual);
      const filePath = path.join('uploads', 'quadras', filename);

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Erro ao remover foto antiga da quadra:", err);
        }
      }
    }

    // Atualiza o banco com novo caminho
    await db.promise().query(
      "UPDATE Quadra SET Foto = ? WHERE ID_Quadra = ?",
      [fullUrl, id]
    );

    // Busca os dados atualizados
    const [updatedResults] = await db.promise().query(
      "SELECT * FROM Quadra WHERE ID_Quadra = ?",
      [id]
    );

    res.json({
      message: "Foto da quadra atualizada com sucesso",
      fotoUrl: updatedResults[0].Foto
    });

  } catch (err) {
    console.error("Erro no processo de upload da quadra:", err);

    if (file && file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    res.status(500).json({
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
});


//Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na rota ${port}`);
});
