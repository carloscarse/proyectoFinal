// proyecto/backEnd/services/persona.js

const PersonaRepositorio = require('../repositories/persona');

const PersonaServicio = {
  async obtenerPersona(user) {
    if (!user.permisos.includes("persona:ver")) {
      throw new Error("No tiene permiso para ver personas");
    }
    return await PersonaRepositorio.obtenerPersona();
  },

  async obtenerPersonaPorId(user, id) {
    if (!user.permisos.includes("persona:ver")) {
      throw new Error("No tiene permiso para ver personas");
    }
    if (!id) throw new Error('ID requerido');

    const persona = await PersonaRepositorio.obtenerPersonaPorId(id);
    if (!persona) throw new Error('Persona no encontrada o eliminada');

    return persona;
  },

  async agregarPersona(user, data) {
    if (!user.permisos.includes("persona:agregar")) {
      throw new Error("No tiene permiso para agregar personas");
    }
    return await PersonaRepositorio.agregarPersona(data);
  },

  async actualizarPersona(user, id, data) {
    if (!user.permisos.includes("persona:editar")) {
      throw new Error("No tiene permiso para editar personas");
    }
    if (!id) throw new Error('ID requerido');

    const personaPrev = await PersonaRepositorio.obtenerPersonaPorId(id);
    if (!personaPrev) throw new Error(`Persona con id ${id} no encontrada o eliminada`);

    await PersonaRepositorio.actualizarPersona(id, { ...data });
    return { id, ...data };
  },

  // 🔹 Borrado lógico
  async eliminarPersona(user, id) {
    if (!user.permisos.includes("persona:eliminar")) {
      throw new Error("No tiene permiso para eliminar personas");
    }
    if (!id) throw new Error('ID requerido');

    await PersonaRepositorio.eliminarPersona(id);
    return { message: `Persona con id ${id} marcada como borrada (borrado lógico)` };
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarPersonaFisico(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    await PersonaRepositorio.eliminarPersonaFisico(id);
    return { message: `Persona con id ${id} eliminada físicamente (borrado definitivo)` };
  },

  async obtenerPersonasEliminadas(user) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    return await PersonaRepositorio.obtenerPersonasEliminadas();
  },

  async obtenerPersonaEliminadaPorId(user, id) {
    if (user.rol !== 'admin') {
      throw new Error("Acción no permitida: solo administradores");
    }
    if (!id) throw new Error('ID requerido');

    const persona = await PersonaRepositorio.obtenerPersonaEliminadaPorId(id);
    if (!persona) throw new Error('Persona eliminada no encontrada');

    return persona;
  }
};

module.exports = PersonaServicio;