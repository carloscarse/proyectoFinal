// proyecto/backEnd/services/telefono.js

const TelefonoRepositorio = require('../repositories/telefono');
const PersonaRepositorio = require('../repositories/persona');

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

    const personaExiste = await PersonaRepositorio.obtenerPersonaPorId(data.persona);
    if (!personaExiste) {
      throw new Error(`La persona con ID ${data.persona} no existe`);
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

  async eliminarTelefono(user, id) {
    if (!user.permisos.includes("telefono:eliminar")) {
      throw new Error("No tiene permiso para eliminar teléfonos");
    }
    if (!id) throw new Error('ID requerido');

    await TelefonoRepositorio.eliminarTelefono(id);
    return { message: `Teléfono con id ${id} eliminado` };
  },

  async obtenerTelefonosPorPersonaId(user, personaId) {
    if (!user.permisos.includes("telefono:ver")) {
      throw new Error("No tiene permiso para ver teléfonos");
    }
    if (!personaId) throw new Error("ID de persona requerido");

    return await TelefonoRepositorio.obtenerTelefonosPorPersonaId(personaId);
  }
};

module.exports = TelefonoServicio;