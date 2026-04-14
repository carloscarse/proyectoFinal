//proyecto/backEnd/middleware/permiso.js
const PermisoService = require('../services/permiso');

function requierePermiso(recurso, accion) {
  return async (req, res, next) => {
    try {
      // 🔐 Log para ver qué usuario y rol llega desde el token
      console.log('🔑 Usuario decodificado en req.user:', req.user);
      console.log('🔐 Rol recibido:', req.user?.rol);

      // 🔍 Log para ver qué permiso se está consultando
      console.log(`➡️ Validando acceso: rol=${req.user?.rol}, recurso=${recurso}, accion=${accion}`);

      const rol = req.user.rol;
      await PermisoService.validarAcceso(rol, recurso, accion);

      console.log('✅ Permiso concedido');
      next();
    } catch (err) {
      console.error('❌ Permiso denegado:', err.message);
      res.status(403).json({ error: err.message });
    }
  };
}

module.exports = requierePermiso;