// proyecto/backend/src/services/pago.js
const PagoRepository = require('../repositories/pago');

const PagoService = {
  async getAll() {
    return await PagoRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const pago = await PagoRepository.getById(id);
    if (!pago) throw new Error('Pago no encontrado');
    return pago;
  },

  async create(data) {
    console.log('📥 Datos recibidos en PagoService.create:', data);

    // Validaciones básicas
    if (!data.numero) {
      // Si no viene número, sugerimos uno automáticamente
      const sugerido = await PagoRepository.getNextNumero();
      data.numero = sugerido;
      console.log('🔢 Número sugerido para pago:', sugerido);
    }

    if (!data.fecha) {
      throw new Error('Campo obligatorio: fecha');
    }

    if (isNaN(Date.parse(data.fecha))) {
      throw new Error('El campo fecha debe ser una fecha válida');
    }

    if (!data.inquilino) {
      throw new Error('Campo obligatorio: inquilino');
    }

    return await PagoRepository.create({
      registro: data.registro || new Date(), // por defecto la fecha actual
      fecha: data.fecha,
      usuario: data.usuario || null,
      inquilino: data.inquilino,
      nota: data.nota || null,
      numero: data.numero
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en PagoService.update:', id, data);

    if (!data.numero) {
      throw new Error('Campo obligatorio: numero');
    }

    if (!data.fecha) {
      throw new Error('Campo obligatorio: fecha');
    }

    if (isNaN(Date.parse(data.fecha))) {
      throw new Error('El campo fecha debe ser una fecha válida');
    }

    if (!data.inquilino) {
      throw new Error('Campo obligatorio: inquilino');
    }

    return await PagoRepository.update(id, {
      registro: data.registro || new Date(),
      fecha: data.fecha,
      usuario: data.usuario || null,
      inquilino: data.inquilino,
      nota: data.nota || null,
      numero: data.numero
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await PagoRepository.delete(id);
  },

  // Método para obtener el próximo número sugerido
  async getNextNumero() {
    return await PagoRepository.getNextNumero();
  }
};

module.exports = PagoService;