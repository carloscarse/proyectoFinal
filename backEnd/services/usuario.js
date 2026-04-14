// proyecto/backEnd/services/usuario.js
const UsuarioRepositorio = require('../repositories/usuario');

const UsuarioServicio = {
  async obtenerUsuario() {
    return await UsuarioRepositorio.obtenerUsuario();
  },

  async obtenerUsuarioPorId(id) {
    if (!id) throw new Error('ID requerido');
    const usuario = await UsuarioRepositorio.obtenerUsuarioPorId(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  },

  async obtenerUsuarioPorNombre(nombreUsuario) {
    if (!nombreUsuario) throw new Error('Usuario requerido');
    return await UsuarioRepositorio.obtenerUsuarioPorNombre(nombreUsuario);
  },

  async agregarUsuario(data) {
    if (!data.usuario) throw new Error('Campo obligatorio: usuario');
    if (!data.clave) throw new Error('Campo obligatorio: clave');
    if (!data.rol) throw new Error('Campo obligatorio: rol');
    return await UsuarioRepositorio.agregarUsuario({
      usuario: data.usuario,
      clave: data.clave,
      rol: data.rol
    });
  },

  async actualizarUsuario(id, data) {
    if (!id) throw new Error('ID requerido');
    if (!data.usuario) throw new Error('Campo obligatorio: usuario');
    if (!data.clave) throw new Error('Campo obligatorio: clave');
    if (!data.rol) throw new Error('Campo obligatorio: rol');
    return await UsuarioRepositorio.actualizarUsuario(id, {
      usuario: data.usuario,
      clave: data.clave,
      rol: data.rol
    });
  },

  async eliminarUsuario(id) {
    if (!id) throw new Error('ID requerido');
    return await UsuarioRepositorio.eliminarUsuario(id);
  }
};

module.exports = UsuarioServicio;