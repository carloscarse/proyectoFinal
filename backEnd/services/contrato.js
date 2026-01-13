const ContratoRepository = require('../repositories/contrato');

const ContratoService = {
  async getAll() {
    return await ContratoRepository.getAll();
  },

  async getById(id) {
    return await ContratoRepository.getById(id);
  },

  async create(data) {
    if (!data.numeroContrato) throw new Error('El número de contrato es obligatorio');
    return await ContratoRepository.create(data);
  },

  async update(id, data) {
    if (!data.numeroContrato) throw new Error('El número de contrato es obligatorio');
    return await ContratoRepository.update(id, data);
  },

  async delete(id) {
    return await ContratoRepository.delete(id);
  }
};

module.exports = ContratoService;