// proyecto/backEnd/services/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsuarioRepositorio = require('../repositories/usuario');
const LogMovimientoServicio = require('../services/logMovimiento');

const AuthServicio = {
  async login(usuario, clave, ip) {
    // Buscar usuario en la base
    const user = await UsuarioRepositorio.obtenerUsuarioPorNombre(usuario);
    if (!user) throw new Error('Usuario no encontrado o eliminado');

    // Validar clave
    const claveValida = await bcrypt.compare(clave, user.clave);
    if (!claveValida) throw new Error('Clave incorrecta');

    // Payload del token con id incluido
    const payload = {
      id: user.id,
      usuario: user.usuario,
      rol: Number(user.rol)
    };

    const token = jwt.sign(payload, process.env.CLAVE_ENCRIPTADO, {
      expiresIn: '8h'
    });

    // Registrar log de login
    await LogMovimientoServicio.agregarLogMovimiento({
      usuario: user.id,
      accion: 'consulta',
      entidad: 'usuario',
      campo: null,
      previo: 'Sin Login',
      nuevo: 'login exitoso',
      ip,
      detalle: `Usuario ${user.usuario} inició sesión`
    });

    return { token };
  },

  async logout(usuario, ip) {
    // Buscar usuario en la base para obtener su ID
    const user = await UsuarioRepositorio.obtenerUsuarioPorNombre(usuario);
    if (!user) throw new Error('Usuario no encontrado o eliminado');

    // Registrar log de logout
    await LogMovimientoServicio.agregarLogMovimiento({
      usuario: user.id,
      accion: 'consulta',
      entidad: 'usuario',
      campo: null,
      previo: 'login activo',
      nuevo: 'logout exitoso',
      ip,
      detalle: `Usuario ${usuario} cerró sesión`
    });

    return { ok: true };
  }
};

module.exports = AuthServicio;