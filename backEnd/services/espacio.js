// proyecto/backEnd/services/espacio.js

const EspacioRepositorio = require('../repositories/espacio');

const EspacioServicio = {
  async obtenerEspacios(user) {
    if (!user.permisos.includes("espacio:ver")) {
      throw new Error("No tiene permiso para ver espacios");
    }
    return await EspacioRepositorio.obtenerEspacios();
  },

  async obtenerEspacioPorId(user, id) {
    if (!user.permisos.includes("espacio:ver")) {
      throw new Error("No tiene permiso para ver espacios");
    }
    if (!id) throw new Error('ID requerido');

    const espacio = await EspacioRepositorio.obtenerEspacioPorId(id);
    if (!espacio) throw new Error('Espacio no encontrado o eliminado');

    return espacio;
  },

  async agregarEspacio(user, data) {
    if (!user.permisos.includes("espacio:agregar")) {
      throw new Error("No tiene permiso para agregar espacios");
    }
    return await EspacioRepositorio.agregarEspacio(data);
  },

  async actualizarEspacio(user, id, data) {
    if (!user.permisos.includes("espacio:editar")) {
      throw new Error("No tiene permiso para editar espacios");
    }
    if (!id) throw new Error('ID requerido');

    const espacioPrev = await EspacioRepositorio.obtenerEspacioPorId(id);
    if (!espacioPrev) throw new Error(`Espacio con id ${id} no encontrado o eliminado`);

    await EspacioRepositorio.actualizarEspacio(id, { ...data });
    return { id, ...data };
  },

  // 🔹 Borrado lógico
  async eliminarEspacio(user, id) {
    if (!user.permisos.includes("espacio:eliminar")) {
      throw new Error("No tiene permiso para eliminar espacios");
    }
    if (!id) throw new Error('ID requerido');

    await EspacioRepositorio.eliminarEspacio(id);
    return { message: `Espacio con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarEspacioFisico(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    await EspacioRepositorio.eliminarEspacioFisico(id);
    return { message: `Espacio con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerEspaciosEliminados(user) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    return await EspacioRepositorio.obtenerEspaciosEliminados();
  },

  async obtenerEspacioEliminadoPorId(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    const espacio = await EspacioRepositorio.obtenerEspacioEliminadoPorId(id);
    if (!espacio) throw new Error('Espacio eliminado no encontrado');

    return espacio;
  }
};

module.exports = EspacioServicio;