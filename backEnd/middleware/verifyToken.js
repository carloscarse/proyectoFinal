// proyecto/backend/middleware/verifyToken.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const PermisoRepository = require('../repositories/permiso');

const patron = process.env.CLAVE_ENCRIPTADO; // Clave de Encriptado

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, patron); // Verifica que el token sea válido y no esté vencido.

    // 👇 Cargar permisos desde la BD
    const permisos = await PermisoRepository.permisosPorUsuario(decoded.usuario);

    // Guardar datos completos del usuario en la request
    req.user = {
      ...decoded,
      permisos
    };

    next(); // Permite que la ruta continúe si el token es válido
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;