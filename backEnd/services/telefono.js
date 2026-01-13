// proyecto/backend/src/services/telefono.js
const TelefonoRepository = require('../repositories/telefono');

const TelefonoService = {
  async getAllByPersona(personaId) {
    if (!personaId) throw new Error('ID de persona requerido');
    return await TelefonoRepository.getAllByPersona(personaId);
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const telefono = await TelefonoRepository.getById(id);
    if (!telefono) throw new Error('Teléfono no encontrado');
    return telefono;
  },

  async create(personaId, data) {
    if (!personaId) throw new Error('ID de persona requerido');
    console.log('📥 Datos recibidos en TelefonoService.create:', personaId, data);

    try {
      const nuevoTelefono = await TelefonoRepository.create(personaId, data);
      console.log('✅ Teléfono creado con ID:', nuevoTelefono.id);
      return nuevoTelefono;
    } catch (err) {
      console.error('❌ Error en TelefonoService.create:', err.message);
      throw err;
    }
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');
    console.log('✏️ Datos recibidos en TelefonoService.update:', id, data);

    try {
      return await TelefonoRepository.update(id, data);
    } catch (err) {
      console.error('❌ Error en TelefonoService.update:', err.message);
      throw err;
    }
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    try {
      return await TelefonoRepository.delete(id);
    } catch (err) {
      console.error('❌ Error en TelefonoService.delete:', err.code, err.message);
      throw err;
    }
  }
};

module.exports = TelefonoService;