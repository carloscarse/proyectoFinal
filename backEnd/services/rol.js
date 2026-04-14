// proyecto/backEnd/services/rol.js
const RolRepositorio = require('../repositories/rol');

const RolServicio = {
  async obtenerRol() {
    return await RolRepositorio.obtenerRol();
  },

  async obtenerRolPorId(id) {
    if (!id) throw new Error('ID requerido');
    const rol = await RolRepositorio.obtenerRolPorId(id);
    if (!rol) throw new Error('Rol no encontrado');
    return rol;
  },

  async agregarRol(data) {
    if (!data.rol) throw new Error('Campo obligatorio: rol');
    return await RolRepositorio.agregarRol({
      rol: data.rol,
      descripcion: data.descripcion || null,
      nota: data.nota || null
    });
  },

  async actualizarRol(id, data) {
    if (!id) throw new Error('ID requerido');
    if (!data.rol) throw new Error('Campo obligatorio: rol');
    return await RolRepositorio.actualizarRol(id, {
      rol: data.rol,
      descripcion: data.descripcion || null,
      nota: data.nota || null
    });
  },

  async eliminarRol(id) {
    if (!id) throw new Error('ID requerido');
    return await RolRepositorio.eliminarRol(id);
  }
};

module.exports = RolServicio;