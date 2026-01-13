// proyecto/backend/src/services/direccion.js
const DireccionRepository = require('../repositories/direccion');

const DireccionService = {
  async getAllByPersona(personaId) {
    if (!personaId) throw new Error('ID de persona requerido');
    return await DireccionRepository.getAllByPersona(personaId);
  },

  async create(personaId, data) {
    if (!personaId) throw new Error('ID de persona requerido');
    console.log('📥 Datos recibidos en DireccionService.create:', personaId, data);

    try {
      const nuevaDireccion = await DireccionRepository.create(personaId, data);
      console.log('✅ Dirección creada con ID:', nuevaDireccion.id);
      return nuevaDireccion;
    } catch (err) {
      console.error('❌ Error en DireccionService.create:', err.message);
      throw err;
    }
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    try {
      return await DireccionRepository.delete(id);
    } catch (err) {
      console.error('❌ Error en DireccionService.delete:', err.code, err.message);
      throw err;
    }
  }
};

module.exports = DireccionService;