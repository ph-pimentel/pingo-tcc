const jwt = require("jsonwebtoken");
const JWT_SECRET = "PingoMaisMelhor";

const senha = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado! Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado!" });
    }
};

module.exports = senha;
