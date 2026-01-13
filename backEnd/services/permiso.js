const PermisoRepository = require('../repositories/permiso');

const PermisoService = {
  async validarAcceso(rol, recurso, accion) {
    console.log(`📦 Consultando permiso en BD: rol=${rol}, recurso=${recurso}, accion=${accion}`);
    const permitido = await PermisoRepository.tienePermiso(rol, recurso, accion);
    console.log('📊 Resultado permitido:', permitido);

    if (!permitido) {
      throw new Error(`Acceso denegado: rol ${rol} no puede ${accion} en ${recurso}`);
    }
    return true;
  }
};

module.exports = PermisoService;