// proyecto/backend/src/services/inquilino.js
const InquilinoRepository = require('../repositories/inquilino');

const InquilinoService = {
  async getAll() {
    return await InquilinoRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const inquilino = await InquilinoRepository.getById(id);
    if (!inquilino) throw new Error('Inquilino no encontrado');
    return inquilino;
  },

  async create(data) {
    console.log('📥 Datos recibidos en InquilinoService.create:', data);

    // Validaciones básicas
    if (!data.persona) {
      throw new Error('Campo obligatorio: persona');
    }

    // Alta puede ser opcional, pero si viene debe ser fecha válida
    if (data.alta && isNaN(Date.parse(data.alta))) {
      throw new Error('El campo alta debe ser una fecha válida');
    }

    return await InquilinoRepository.create({
      persona: data.persona,
      alta: data.alta || null
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en InquilinoService.update:', id, data);

    if (data.persona === undefined) {
      throw new Error('Campo obligatorio: persona');
    }

    if (data.alta && isNaN(Date.parse(data.alta))) {
      throw new Error('El campo alta debe ser una fecha válida');
    }

    return await InquilinoRepository.update(id, {
      persona: data.persona,
      alta: data.alta || null
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await InquilinoRepository.delete(id);
  }
};

module.exports = InquilinoService;