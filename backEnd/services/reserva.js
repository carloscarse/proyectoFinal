const ReservaRepository = require('../repositories/reserva');

const ReservaService = {
  async getAll() {
    return await ReservaRepository.getAll();
  },

  async getById(id) {
    return await ReservaRepository.getById(id);
  },

  async create(data) {
    if (!data.espacio) throw new Error('El espacio de la reserva es obligatorio');
    return await ReservaRepository.create(data);
  },

  async update(id, data) {
    if (!data.espacio) throw new Error('El espacio de la reserva es obligatorio');
    return await ReservaRepository.update(id, data);
  },

  async delete(id) {
    return await ReservaRepository.delete(id);
  }
};

module.exports = ReservaService;