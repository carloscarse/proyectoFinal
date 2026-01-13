// proyecto/backend/src/services/rol.js
const RolRepository = require('../repositories/rol');

const RolService = {
  async getAll() {
    return await RolRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const rol = await RolRepository.getById(id);
    if (!rol) throw new Error('Rol no encontrado');
    return rol;
  },

  async create(data) {
    console.log('📥 Datos recibidos en RolService.create:', data);

    if (!data.rol) {
      throw new Error('Campo obligatorio: rol');
    }

    return await RolRepository.create({
      rol: data.rol,
      descripcion: data.descripcion || null,
      nota: data.nota || null
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en RolService.update:', id, data);

    if (!data.rol) {
      throw new Error('Campo obligatorio: rol');
    }

    return await RolRepository.update(id, {
      rol: data.rol,
      descripcion: data.descripcion || null,
      nota: data.nota || null
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await RolRepository.delete(id);
  }
};

module.exports = RolService;