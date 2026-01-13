// proyecto/backend/src/services/espacio.js
const EspacioRepository = require('../repositories/espacio');

const EspacioService = {
  async getAll() {
    return await EspacioRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const espacio = await EspacioRepository.getById(id);
    if (!espacio) throw new Error('Espacio no encontrado');
    return espacio;
  },

  async create(data) {
    console.log('📥 Datos recibidos en EspacioService.create:', data);

    // Validaciones básicas
    if (!data.nombre) {
      throw new Error('Campo obligatorio: nombre');
    }

    if (data.capacidad !== undefined && isNaN(Number(data.capacidad))) {
      throw new Error('El campo capacidad debe ser numérico');
    }

    return await EspacioRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      capacidad: data.capacidad || null
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en EspacioService.update:', id, data);

    if (!data.nombre) {
      throw new Error('Campo obligatorio: nombre');
    }

    if (data.capacidad !== undefined && isNaN(Number(data.capacidad))) {
      throw new Error('El campo capacidad debe ser numérico');
    }

    return await EspacioRepository.update(id, {
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      capacidad: data.capacidad || null
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await EspacioRepository.delete(id);
  }
};

module.exports = EspacioService;