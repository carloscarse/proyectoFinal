// proyecto/backend/src/services/rubro.js
const RubroRepository = require('../repositories/rubro');

const RubroService = {
  async getAll() {
    return await RubroRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const rubro = await RubroRepository.getById(id);
    if (!rubro) throw new Error('Rubro no encontrado');
    return rubro;
  },

  async create(data) {
    console.log('📥 Datos recibidos en RubroService.create:', data);

    // No se aplican validaciones estrictas: todos los campos pueden ser null
    const nuevoRubro = await RubroRepository.create(data);
    console.log('✅ Rubro creado con ID:', nuevoRubro.id);

    return nuevoRubro;
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');
    console.log('✏️ Datos recibidos en RubroService.update:', id, data);

    // Actualización directa, permitiendo null en cualquier campo
    return await RubroRepository.update(id, { ...data });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    try {
      return await RubroRepository.delete(id);
    } catch (err) {
      console.error('❌ Error en RubroService.delete:', err.code, err.message);

      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new Error('No se puede eliminar: el rubro está vinculado a otros registros (foreign key)');
      }

      throw err;
    }
  }
};

module.exports = RubroService;