// proyecto/backend/src/services/usuario.js
const UsuarioRepository = require('../repositories/usuario');

const UsuarioService = {
  async getAll() {
    return await UsuarioRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const usuario = await UsuarioRepository.getById(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  },

  async create(data) {
    console.log('📥 Datos recibidos en UsuarioService.create:', data);

    // Validaciones básicas
    if (!data.usuario) {
      throw new Error('Campo obligatorio: usuario');
    }
    if (!data.clave) {
      throw new Error('Campo obligatorio: clave');
    }
    if (!data.rol) {
      throw new Error('Campo obligatorio: rol');
    }

    return await UsuarioRepository.create({
      usuario: data.usuario,
      clave: data.clave,
      rol: data.rol
    });
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    console.log('✏️ Datos recibidos en UsuarioService.update:', id, data);

    if (!data.usuario) {
      throw new Error('Campo obligatorio: usuario');
    }
    if (!data.clave) {
      throw new Error('Campo obligatorio: clave');
    }
    if (!data.rol) {
      throw new Error('Campo obligatorio: rol');
    }

    return await UsuarioRepository.update(id, {
      usuario: data.usuario,
      clave: data.clave,
      rol: data.rol
    });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await UsuarioRepository.delete(id);
  }
};

module.exports = UsuarioService;