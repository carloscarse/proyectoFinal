// proyecto/backend/src/services/alquiler.js
const AlquilerRepository = require('../repositories/alquiler');

const AlquilerService = {
  async getAll() {
    return await AlquilerRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const alquiler = await AlquilerRepository.getById(id);
    if (!alquiler) throw new Error('Alquiler no encontrado');
    return alquiler;
  },

  async create(data) {
    console.log('📥 Datos recibidos en AlquilerService.create:', data);

    // Validaciones básicas
    if (!data.inquilino) {
      throw new Error('Campo obligatorio: inquilino');
    }
    if (!data.espacio) {
      throw new Error('Campo obligatorio: espacio');
    }

    if (data.fechaInicio && isNaN(Date.parse(data.fechaInicio))) {
      throw new Error('El campo fechaInicio debe ser una fecha válida');
    }
    if (data.fechaFin && isNaN(Date.parse(data.fechaFin))) {
      throw new Error('El campo fechaFin debe ser una fecha válida');
    }

    return await AlquilerRepository.create({
      inquilino: data.inquilino,
      espacio: data.espacio,
      fechaInicio: data.fechaInicio || null,
      fechaFin: data.fechaFin || null
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en AlquilerService.update:', id, data);

    if (!data.inquilino) {
      throw new Error('Campo obligatorio: inquilino');
    }
    if (!data.espacio) {
      throw new Error('Campo obligatorio: espacio');
    }

    if (data.fechaInicio && isNaN(Date.parse(data.fechaInicio))) {
      throw new Error('El campo fechaInicio debe ser una fecha válida');
    }
    if (data.fechaFin && isNaN(Date.parse(data.fechaFin))) {
      throw new Error('El campo fechaFin debe ser una fecha válida');
    }

    return await AlquilerRepository.update(id, {
      inquilino: data.inquilino,
      espacio: data.espacio,
      fechaInicio: data.fechaInicio || null,
      fechaFin: data.fechaFin || null
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await AlquilerRepository.delete(id);
  }
};

module.exports = AlquilerService;