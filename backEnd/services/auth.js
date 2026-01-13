// proyecto/backend/src/services/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsuarioRepository = require('../repositories/usuario');

const AuthService = {
  async login(usuario, clave) {
    // Buscar usuario en la base
    const user = await UsuarioRepository.getByUsuario(usuario);
    if (!user) throw new Error('Usuario no encontrado');

    // Validar clave
    const claveValida = await bcrypt.compare(clave, user.clave);
    if (!claveValida) throw new Error('Clave incorrecta');

    // 👇 incluimos rol como número en el payload del token
    const payload = {
      id: user.id,
      usuario: user.usuario,
      rol: Number(user.rol)   // 👈 aseguramos que sea numérico
    };

    const token = jwt.sign(payload, process.env.CLAVE_ENCRIPTADO, {
      expiresIn: '8h'
    });

    return { token };
  }
};

module.exports = AuthService;