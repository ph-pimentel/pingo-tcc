const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

//Middleware que permite Cors e tratamento de Json
app.use(cors());
app.use(express.json())

//Conexão Mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'PINGO',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!')
});

/// --> Sessão Quadras Pub

//Rota que vai conter os dados das quadras
app.get('/quadraspub', (req, res) => {
    db.query('SELECT * FROM Quadra WHERE TipoQuadra = ?', [0], (err, results) => {
        if (err) {
            console.error('Erro ao obter quadras:', err)
            return res.status(500).send('Erro ao obter quadras')
          }
          res.json(results);
    });
    
})


// Rota para criar uma nova quadra publica
app.post('/quadraspub', (req, res) => {
    const { NomeQuadra, EnderecoQuadra, Bairro, Cidade} = req.body;
    db.query(
        'INSERT INTO Quadra (NomeQuadra, EnderecoQuadra, Bairro, Cidade) VALUES (?,?,?,?)',
        [NomeQuadra, EnderecoQuadra, Bairro, Cidade],
        (err, result) => {
            if (err) throw err;
            res.json({ ID_Quadra : result.insertId,NomeQuadra, EnderecoQuadra, Bairro, Cidade });
        }
    )
})

//Rota para atualizar uma quadra pública existente
app.put('/quadraspub/att/:id', (req, res) => {
    const {id} = req.params;
    const { NomeQuadra, EnderecoQuadra, Bairro, Cidade } = req.body;

    db.query(
        'UPDATE Quadra SET NomeQuadra = ?, EnderecoQuadra = ?, Bairro = ?, Cidade = ? WHERE ID_Quadra = ?',
            [NomeQuadra, EnderecoQuadra, Bairro, Cidade, id],
            (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar quadra:', err);
                    return res.status(500).json({ error: 'Quadra não encontrada'});
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Quadra não encontrada'});
                }

                res.json({
                    ID_Quadra: id,
                    NomeQuadra,
                    EnderecoQuadra,
                    Bairro,
                    Cidade,
                    message: 'Quadra atualizada com sucesso'
                });
            }
    );
});

//Rota para deletar uma quadra de acordo com o ID
app.delete('/quadraspub/delete/:id', (req, res) => {
    const  {id}  = req.params;
    db.query('DELETE FROM Quadra WHERE ID_Quadra = ?', [id], (err, result) =>{
        if (err) {
            console.error('Erro ao deletar quadra:', err);
            return res.status(500).json({ error: 'Erro ao deletar quadra'});
        }
        res.json({ message: 'Quadra deletada com sucesso' });
    });
});

//-> Single Page Quadra Pub
app.get('/quadraspub/:id', (req, res) => {
    const {id} = req.params;
    db.query('SELECT * FROM Quadra WHERE ID_Quadra = ?', [id], (err, results) =>{
        if (err) {
            console.error('Erro ao obter quadra:', err);
            return res.status(500).send('Erro ao obter quadra')
        }
        res.json({results});
    });
});


/// --> Sessão Quadras Privadas BackEnd

//Rota que vai conter os dados das quadras privadas
app.get('/quadraspriv', (req, res) => {
    db.query('SELECT * FROM Quadra WHERE TipoQuadra = ?', [1], (err, results) => {
        if (err) {
            console.error('Erro ao obter quadras:', err)
            return res.status(500).send('Erro ao obter quadras')
          }
          res.json(results);
    });
    
})

//Rota para deletar uma quadra de acordo com o ID
app.delete('/quadraspriv/delete/:id', (req, res) => {
    const  {id}  = req.params;
    db.query('DELETE FROM Quadra WHERE ID_Quadra = ?', [id], (err, result) =>{
        if (err) {
            console.error('Erro ao deletar quadra:', err);
            return res.status(500).json({ error: 'Erro ao deletar quadra'});
        }
        res.json({ message: 'Quadra deletada com sucesso' });
    });
});

// Single Page Quadra Privada
app.get('/quadraspriv/:id', (req, res) => {
    const {id} = req.params;
    db.query('SELECT * FROM Quadra WHERE ID_Quadra = ?', [id], (err, results) =>{
        if (err) {
            console.error('Erro ao obter quadra:', err);
            return res.status(500).send('Erro ao obter quadra')
        }
        res.json({results});
    });
});

//Rota para atualizar uma quadra pública existente
app.put('/quadraspriv/att/:id', (req, res) => {
    const {id} = req.params;
    const { NomeQuadra, EnderecoQuadra, Bairro, Cidade } = req.body;

    db.query(
        'UPDATE Quadra SET NomeQuadra = ?, EnderecoQuadra = ?, Bairro = ?, Cidade = ? WHERE ID_Quadra = ?',
            [NomeQuadra, EnderecoQuadra, Bairro, Cidade, id],
            (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar quadra:', err);
                    return res.status(500).json({ error: 'Quadra não encontrada'});
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Quadra não encontrada'});
                }

                res.json({
                    ID_Quadra: id,
                    NomeQuadra,
                    EnderecoQuadra,
                    Bairro,
                    Cidade,
                    message: 'Quadra atualizada com sucesso'
                });
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
app.get('/user/:id', (req, res) => {
    const {id} = req.params;
    db.query('SELECT * FROM Usuario WHERE ID_Usuario = ?', [id], (err, results) =>{
        if (err) {
            console.error('Erro ao obter usuario:', err);
            return res.status(500).send('Erro ao obter quadra')
        }
        res.json({results});
    });
});

//Rota para atualizar um usuario existente
app.put('/user/att/:id', (req, res) => {
    const {id} = req.params;
    const { NomeUsuario, Email, TipoUsuario } = req.body;

    db.query(
        'UPDATE Usuario SET NomeUsuario = ?, Email = ?, TipoUsuario = ? WHERE ID_Usuario = ?',
            [NomeUsuario, Email, TipoUsuario, id],
            (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar usuario:', err);
                    return res.status(500).json({ error: 'Usuario não encontrada'});
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Usuario não encontrada'});
                }

                res.json({
                    ID_Usuario: id,
                    NomeUsuario,
                    Email,
                    TipoUsuario,
                    message: 'Usuario atualizada com sucesso'
                });
            }
    );
});


//Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na rota ${port}`)
})