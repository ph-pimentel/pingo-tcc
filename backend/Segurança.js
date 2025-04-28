const jwt = require('jsonwebtoken');
const JWT_SECRET = "PingoMaisMelhor";

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.usuario = usuario;
        next();
    });
}

module.exports = verificarToken;
