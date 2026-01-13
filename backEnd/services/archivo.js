const ArchivoRepository = require('../repositories/archivo');

const ArchivoService = {
  async getAll() {
    return await ArchivoRepository.getAll();
  },

  async getById(id) {
    return await ArchivoRepository.getById(id);
  },

  async create(data) {
    if (!data.nombreArchivo) throw new Error('El nombre del archivo es obligatorio');
    return await ArchivoRepository.create(data);
  },

  async update(id, data) {
    if (!data.nombreArchivo) throw new Error('El nombre del archivo es obligatorio');
    return await ArchivoRepository.update(id, data);
  },

  async delete(id) {
    return await ArchivoRepository.delete(id);
  }
};

module.exports = ArchivoService;