const mysql = require('mysql2/promise'); // Versão com Promises

// Criar pool de conexões
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Root@123',
  database: 'PINGO',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;