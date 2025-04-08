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
    password: '1234',
    database: 'PINGO',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!')
});

//Rota que vai conter os dados das quadras
app.get('/quadraspub', (req, res) => {
    db.query('SELECT * FROM Quadra', (err, results) => {
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

//Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na rota ${port}`)
})