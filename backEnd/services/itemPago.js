const ItemPagoRepository = require('../repositories/itemPago');

const ItemPagoService = {
  async getAll() {
    return await ItemPagoRepository.getAll();
  },

  async getById(id) {
    return await ItemPagoRepository.getById(id);
  },

  async create(data) {
    if (!data.item) throw new Error('El ítem de pago es obligatorio');
    return await ItemPagoRepository.create(data);
  },

  async update(id, data) {
    if (!data.item) throw new Error('El ítem de pago es obligatorio');
    return await ItemPagoRepository.update(id, data);
  },

  async delete(id) {
    return await ItemPagoRepository.delete(id);
  }
};

module.exports = ItemPagoService;