const FacturaRepository = require('../repositories/factura');

const FacturaService = {
  async getAll() {
    return await FacturaRepository.getAll();
  },

  async getById(id) {
    return await FacturaRepository.getById(id);
  },

  async create(data) {
    if (!data.numeroFactura) throw new Error('El número de factura es obligatorio');
    return await FacturaRepository.create(data);
  },

  async update(id, data) {
    if (!data.numeroFactura) throw new Error('El número de factura es obligatorio');
    return await FacturaRepository.update(id, data);
  },

  async delete(id) {
    return await FacturaRepository.delete(id);
  }
};

module.exports = FacturaService;