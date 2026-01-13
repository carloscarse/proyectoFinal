const DocumentacionRepository = require('../repositories/documentacion');

const DocumentacionService = {
  async getAll() {
    return await DocumentacionRepository.getAll();
  },

  async getById(id) {
    return await DocumentacionRepository.getById(id);
  },

  async create(data) {
    if (!data.documento) throw new Error('El campo documento es obligatorio');
    return await DocumentacionRepository.create(data);
  },

  async update(id, data) {
    if (!data.documento) throw new Error('El campo documento es obligatorio');
    return await DocumentacionRepository.update(id, data);
  },

  async delete(id) {
    return await DocumentacionRepository.delete(id);
  }
};

module.exports = DocumentacionService;