require('dotenv').config();
const jwt = require('jsonwebtoken');

const patron = process.env.CLAVE_ENCRIPTADO; // Clave de Encriptado

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, patron); // Verifica que el token sea válido y no esté vencido.
    req.user = decoded; // 👈 usar req.user en lugar de req.usuario
    next();  // Permite que la ruta continúe si el token es válido
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;