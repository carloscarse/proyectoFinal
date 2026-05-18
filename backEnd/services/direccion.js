// proyecto/backEnd/services/direccion.js

const DireccionRepositorio = require('../repositories/direccion');
const PersonaRepositorio = require('../repositories/persona');

const DireccionServicio = {
  async obtenerDireccion(user) {
    if (!user.permisos.includes("direccion:ver")) {
      throw new Error("No tiene permiso para ver direcciones");
    }
    return await DireccionRepositorio.obtenerDireccion();
  },

  async obtenerDireccionPorId(user, id) {
    if (!user.permisos.includes("direccion:ver")) {
      throw new Error("No tiene permiso para ver direcciones");
    }
    if (!id) throw new Error('ID requerido');

    const direccion = await DireccionRepositorio.obtenerDireccionPorId(id);
    if (!direccion) throw new Error('Dirección no encontrada o eliminada');

    return direccion;
  },

  async agregarDireccion(user, data) {
    if (!user.permisos.includes("direccion:agregar")) {
      throw new Error("No tiene permiso para agregar direcciones");
    }
    if (!data.persona) {
      throw new Error("El campo 'persona' es obligatorio para crear una dirección");
    }

    const personaExiste = await PersonaRepositorio.obtenerPersonaPorId(data.persona);
    if (!personaExiste) {
      throw new Error(`La persona con ID ${data.persona} no existe`);
    }

    const direccionData = {
      persona: data.persona,
      calle: data.calle,
      numero: data.numero,
      manzana: data.manzana,
      lote: data.lote,
      edificio: data.edificio,
      piso: data.piso,
      departamento: data.departamento,
      barrio: data.barrio,
      localidad: data.localidad,
      ciudad: data.ciudad,
      provincia: data.provincia,
      pais: data.pais,
      codigoPostal: data.codigoPostal
    };

    return await DireccionRepositorio.agregarDireccion(direccionData);
  },

  async actualizarDireccion(user, id, data) {
    if (!user.permisos.includes("direccion:editar")) {
      throw new Error("No tiene permiso para editar direcciones");
    }
    if (!id) throw new Error('ID requerido');

    const dirPrev = await DireccionRepositorio.obtenerDireccionPorId(id);
    if (!dirPrev) throw new Error(`Dirección con id ${id} no encontrada o eliminada`);

    await DireccionRepositorio.actualizarDireccion(id, { ...data });
    return { id, ...data };
  },

  async eliminarDireccion(user, id) {
    if (!user.permisos.includes("direccion:eliminar")) {
      throw new Error("No tiene permiso para eliminar direcciones");
    }
    if (!id) throw new Error('ID requerido');

    await DireccionRepositorio.eliminarDireccion(id);
    return { message: `Dirección con id ${id} eliminada` };
  },

  async obtenerDireccionesPorPersonaId(user, personaId) {
    if (!user.permisos.includes("direccion:ver")) {
      throw new Error("No tiene permiso para ver direcciones");
    }
    if (!personaId) throw new Error("ID de persona requerido");

    return await DireccionRepositorio.obtenerDireccionesPorPersonaId(personaId);
  }
};

module.exports = DireccionServicio;