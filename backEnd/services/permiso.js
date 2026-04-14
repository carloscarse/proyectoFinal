const PermisoRepositorio = require('../repositories/permiso');

const PermisoServicio = {
  async validarAcceso(rol, recurso, accion) {
    console.log(`📦 Consultando permiso en BD: rol=${rol}, recurso=${recurso}, accion=${accion}`);
    const permitido = await PermisoRepositorio.tienePermiso(rol, recurso, accion);
    console.log('📊 Resultado permitido:', permitido);

    if (!permitido) {
      throw new Error(`Acceso denegado: rol ${rol} no puede ${accion} en ${recurso}`);
    }
    return true;
  },

  async obtenerPermiso() {
    return await PermisoRepositorio.obtenerPermiso();
  },

  async obtenerPermisoPorId(id) {
    if (!id) throw new Error('ID requerido');
    const permiso = await PermisoRepositorio.obtenerPermisoPorId(id);
    if (!permiso) throw new Error('Permiso no encontrado');
    return permiso;
  },

  async agregarPermiso(data) {
    if (!data.rol || !data.recurso || !data.accion) {
      throw new Error('Campos obligatorios: rol, recurso, accion');
    }
    return await PermisoRepositorio.agregarPermiso(data);
  },

  async actualizarPermiso(id, data) {
    if (!id) throw new Error('ID requerido');
    return await PermisoRepositorio.actualizarPermiso(id, data);
  },

  async eliminarPermiso(id) {
    if (!id) throw new Error('ID requerido');
    return await PermisoRepositorio.eliminarPermiso(id);
  }
};

module.exports = PermisoServicio;