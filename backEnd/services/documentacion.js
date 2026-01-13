const DireccionRepository = require('../repositories/direccion');

const DireccionService = {
  async getAll() {
    return await DireccionRepository.getAll();
  },

  async getById(id) {
    return await DireccionRepository.getById(id);
  },

  async create(data) {
    if (!data.calle || !data.numero) throw new Error('Calle y número son obligatorios');
    return await DireccionRepository.create(data);
  },

  async update(id, data) {
    if (!data.calle || !data.numero) throw new Error('Calle y número son obligatorios');
    return await DireccionRepository.update(id, data);
  },

  async delete(id) {
    return await DireccionRepository.delete(id);
  }
};

module.exports = DireccionService;