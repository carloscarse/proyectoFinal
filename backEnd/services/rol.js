// proyecto/backEnd/services/rol.js
const RolRepositorio = require('../repositories/rol');

const RolServicio = {
  async obtenerRol() {
    return await RolRepositorio.obtenerRol();
  },

  async obtenerRolPorId(id) {
    if (!id) throw new Error('ID requerido');
    const rol = await RolRepositorio.obtenerRolPorId(id);
    if (!rol) throw new Error('Rol no encontrado o eliminado');
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

  // 🔹 Borrado lógico
  async eliminarRol(id) {
    if (!id) throw new Error('ID requerido');
    return await RolRepositorio.eliminarRol(id);
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarRolFisico(id) {
    if (!id) throw new Error('ID requerido');
    return await RolRepositorio.eliminarRolFisico(id);
  },

  async obtenerRolesEliminados() {
    return await RolRepositorio.obtenerRolesEliminados();
  },

  async obtenerRolEliminadoPorId(id) {
    if (!id) throw new Error('ID requerido');
    const rol = await RolRepositorio.obtenerRolEliminadoPorId(id);
    if (!rol) throw new Error('Rol eliminado no encontrado');
    return rol;
  }
};

module.exports = RolServicio;