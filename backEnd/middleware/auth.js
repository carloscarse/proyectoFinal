// proyecto/backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const PermisoRepository = require('../repositories/permiso');

async function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLAVE_ENCRIPTADO);

    // 👇 Cargar permisos desde la BD
    const permisos = await PermisoRepository.permisosPorUsuario(decoded.usuario);

    // Guardar datos completos del usuario en la request
    req.user = {
      ...decoded,
      permisos
    };

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = autenticarToken;