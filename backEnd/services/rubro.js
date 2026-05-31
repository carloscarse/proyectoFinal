// proyecto/backEnd/services/rubro.js

const RubroRepositorio = require('../repositories/rubro');

const RubroServicio = {
  async obtenerRubros(user) {
    if (!user.permisos.includes("rubro:ver")) {
      throw new Error("No tiene permiso para ver rubros");
    }
    return await RubroRepositorio.obtenerRubros();
  },

  async obtenerRubroPorId(user, id) {
    if (!user.permisos.includes("rubro:ver")) {
      throw new Error("No tiene permiso para ver rubros");
    }
    if (!id) throw new Error('ID requerido');

    const rubro = await RubroRepositorio.obtenerRubroPorId(id);
    if (!rubro) throw new Error('Rubro no encontrado o eliminado');

    return rubro;
  },

  async agregarRubro(user, data) {
    if (!user.permisos.includes("rubro:agregar")) {
      throw new Error("No tiene permiso para agregar rubros");
    }
    return await RubroRepositorio.agregarRubro(data);
  },

  async actualizarRubro(user, id, data) {
    if (!user.permisos.includes("rubro:editar")) {
      throw new Error("No tiene permiso para editar rubros");
    }
    if (!id) throw new Error('ID requerido');

    const rubroPrev = await RubroRepositorio.obtenerRubroPorId(id);
    if (!rubroPrev) throw new Error(`Rubro con id ${id} no encontrado o eliminado`);

    await RubroRepositorio.actualizarRubro(id, { ...data });
    return { id, ...data };
  },

  // 🔹 Borrado lógico
  async eliminarRubro(user, id) {
    if (!user.permisos.includes("rubro:eliminar")) {
      throw new Error("No tiene permiso para eliminar rubros");
    }
    if (!id) throw new Error('ID requerido');

    await RubroRepositorio.eliminarRubro(id);
    return { message: `Rubro con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarRubroFisico(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    await RubroRepositorio.eliminarRubroFisico(id);
    return { message: `Rubro con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerRubrosEliminados(user) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    return await RubroRepositorio.obtenerRubrosEliminados();
  },

  async obtenerRubroEliminadoPorId(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    const rubro = await RubroRepositorio.obtenerRubroEliminadoPorId(id);
    if (!rubro) throw new Error('Rubro eliminado no encontrado');

    return rubro;
  }
};

module.exports = RubroServicio;