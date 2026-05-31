// proyecto/backEnd/services/inquilino.js

const InquilinoRepositorio = require('../repositories/inquilino');

const InquilinoServicio = {
  async obtenerInquilinos(user) {
    if (!user.permisos.includes("inquilino:ver")) {
      throw new Error("No tiene permiso para ver inquilinos");
    }
    return await InquilinoRepositorio.obtenerInquilinos();
  },

  async obtenerInquilinoPorId(user, id) {
    if (!user.permisos.includes("inquilino:ver")) {
      throw new Error("No tiene permiso para ver inquilinos");
    }
    if (!id) throw new Error('ID requerido');

    const inquilino = await InquilinoRepositorio.obtenerInquilinoPorId(id);
    if (!inquilino) throw new Error('Inquilino no encontrado o eliminado');

    return inquilino;
  },

  async agregarInquilino(user, data) {
    if (!user.permisos.includes("inquilino:agregar")) {
      throw new Error("No tiene permiso para agregar inquilinos");
    }
    return await InquilinoRepositorio.agregarInquilino(data);
  },

  async actualizarInquilino(user, id, data) {
    if (!user.permisos.includes("inquilino:editar")) {
      throw new Error("No tiene permiso para editar inquilinos");
    }
    if (!id) throw new Error('ID requerido');

    const inquilinoPrev = await InquilinoRepositorio.obtenerInquilinoPorId(id);
    if (!inquilinoPrev) throw new Error(`Inquilino con id ${id} no encontrado o eliminado`);

    await InquilinoRepositorio.actualizarInquilino(id, { ...data });
    return { id, ...data };
  },

  // 🔹 Borrado lógico
  async eliminarInquilino(user, id) {
    if (!user.permisos.includes("inquilino:eliminar")) {
      throw new Error("No tiene permiso para eliminar inquilinos");
    }
    if (!id) throw new Error('ID requerido');

    await InquilinoRepositorio.eliminarInquilino(id);
    return { message: `Inquilino con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarInquilinoFisico(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    await InquilinoRepositorio.eliminarInquilinoFisico(id);
    return { message: `Inquilino con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerInquilinosEliminados(user) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    return await InquilinoRepositorio.obtenerInquilinosEliminados();
  },

  async obtenerInquilinoEliminadoPorId(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    const inquilino = await InquilinoRepositorio.obtenerInquilinoEliminadoPorId(id);
    if (!inquilino) throw new Error('Inquilino eliminado no encontrado');

    return inquilino;
  }
};

module.exports = InquilinoServicio;