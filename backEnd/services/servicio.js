// proyecto/backend/src/services/servicio.js
const ServicioRepository = require('../repositories/servicio');

const ServicioService = {
  async getAll() {
    return await ServicioRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const servicio = await ServicioRepository.getById(id);
    if (!servicio) throw new Error('Servicio no encontrado');
    return servicio;
  },

  async create(data) {
    console.log('📥 Datos recibidos en ServicioService.create:', data);

    // Normalizar valores numéricos
    const cantidad = Number(data.cantidad);
    const precio = Number(data.precio);

    // Validaciones básicas
    if (!data.servicio || isNaN(cantidad) || isNaN(precio)) {
      throw new Error('Campos obligatorios: servicio, cantidad, precio');
    }
    if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0');
    if (precio <= 0) throw new Error('El precio debe ser mayor a 0');

    // Pasar datos normalizados al repositorio
    return await ServicioRepository.create({
      ...data,
      cantidad,
      precio
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en ServicioService.update:', id, data);

    // Normalizar valores numéricos si vienen en string
    const cantidad = data.cantidad !== undefined ? Number(data.cantidad) : undefined;
    const precio = data.precio !== undefined ? Number(data.precio) : undefined;

    return await ServicioRepository.update(id, {
      ...data,
      cantidad,
      precio
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await ServicioRepository.delete(id);
  }
};

module.exports = ServicioService;