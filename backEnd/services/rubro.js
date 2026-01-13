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

    // Validaciones básicas
    if (!data.rubro) {
      throw new Error('Campo obligatorio: rubro');
    }

    return await RubroRepository.create({
      rubro: data.rubro,
      descripcion: data.descripcion || null
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en RubroService.update:', id, data);

    if (!data.rubro) {
      throw new Error('Campo obligatorio: rubro');
    }

    return await RubroRepository.update(id, {
      rubro: data.rubro,
      descripcion: data.descripcion || null
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await RubroRepository.delete(id);
  }
};

module.exports = RubroService;