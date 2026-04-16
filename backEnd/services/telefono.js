// proyecto/backEnd/services/telefono.js

const TelefonoRepositorio = require('../repositories/telefono');

const TelefonoServicio = {
  async obtenerTelefono(user) {
    if (!user.permisos.includes("telefono:ver")) {
      throw new Error("No tiene permiso para ver teléfonos");
    }
    return await TelefonoRepositorio.obtenerTelefono();
  },

  async obtenerTelefonoPorId(user, id) {
    if (!user.permisos.includes("telefono:ver")) {
      throw new Error("No tiene permiso para ver teléfonos");
    }
    if (!id) throw new Error('ID requerido');

    const telefono = await TelefonoRepositorio.obtenerTelefonoPorId(id);
    if (!telefono) throw new Error('Teléfono no encontrado o eliminado');

    return telefono;
  },

  async agregarTelefono(user, data) {
    if (!user.permisos.includes("telefono:agregar")) {
      throw new Error("No tiene permiso para agregar teléfonos");
    }
    if (!data.persona) {
      throw new Error("El campo 'persona' es obligatorio para crear un teléfono");
    }

    const telefonoData = {
      persona: data.persona,
      pais: data.pais,
      cArea: data.cArea,
      numero: data.numero
    };

    return await TelefonoRepositorio.agregarTelefono(telefonoData);
  },

  async actualizarTelefono(user, id, data) {
    if (!user.permisos.includes("telefono:editar")) {
      throw new Error("No tiene permiso para editar teléfonos");
    }
    if (!id) throw new Error('ID requerido');

    const telPrev = await TelefonoRepositorio.obtenerTelefonoPorId(id);
    if (!telPrev) throw new Error(`Teléfono con id ${id} no encontrado o eliminado`);

    await TelefonoRepositorio.actualizarTelefono(id, { ...data });
    return { id, ...data };
  },

  // 🔹 Borrado lógico
  async eliminarTelefono(user, id) {
    if (!user.permisos.includes("telefono:eliminar")) {
      throw new Error("No tiene permiso para eliminar teléfonos");
    }
    if (!id) throw new Error('ID requerido');

    await TelefonoRepositorio.eliminarTelefono(id);
    return { message: `Teléfono con id ${id} marcado como borrado (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarTelefonoFisico(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    await TelefonoRepositorio.eliminarTelefonoFisico(id);
    return { message: `Teléfono con id ${id} eliminado físicamente (borrado definitivo)` };
  },

  async obtenerTelefonosPorPersonaId(user, personaId) {
    if (!user.permisos.includes("telefono:ver")) {
      throw new Error("No tiene permiso para ver teléfonos");
    }
    if (!personaId) throw new Error("ID de persona requerido");

    return await TelefonoRepositorio.obtenerTelefonosPorPersonaId(personaId);
  },

  async obtenerTelefonosEliminados(user) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    return await TelefonoRepositorio.obtenerTelefonosEliminados();
  },

  async obtenerTelefonoEliminadoPorId(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    const telefono = await TelefonoRepositorio.obtenerTelefonoEliminadoPorId(id);
    if (!telefono) throw new Error('Teléfono eliminado no encontrado');

    return telefono;
  }
};

module.exports = TelefonoServicio;