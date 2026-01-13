const AuthService = require('../services/auth');
const UsuarioRepository = require('../repositories/usuario');
const RolRepository = require('../repositories/rol');
const PersonaRepository = require('../repositories/persona');

const AuthController = {
  async login(req, res) {
    const { usuario, clave } = req.body;
    try {
      const result = await AuthService.login(usuario, clave);

      // Buscar datos completos del usuario
      const user = await UsuarioRepository.getByUsuario(usuario);
      const rolData = await RolRepository.getById(user.rol);
      const rolNombre = rolData?.rol || 'Rol desconocido';
      const persona = await PersonaRepository.getById(user.persona);
      const nombreCompleto = persona
        ? `${persona.nombre} ${persona.apellido}`
        : 'Nombre desconocido';

      const label = `Usuario: ${rolNombre} ${nombreCompleto}`;

      // 👇 devolvemos rolId (numérico) y rolNombre (texto)
      res.json({
        usuario: user.usuario,
        rol: user.rol,          // 👈 ID numérico del rol
        rolNombre,              // 👈 nombre del rol para mostrar
        nombreCompleto,
        label,
        token: result.token
      });
    } catch (error) {
      if (error.message === 'Usuario no encontrado' || error.message === 'Clave incorrecta') {
        return res.status(401).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getUserByName(req, res) {
    try {
      const { usuario } = req.params;

      const user = await UsuarioRepository.getByUsuario(usuario);
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

      const rolData = await RolRepository.getById(user.rol);
      const rolNombre = rolData?.rol || 'Rol desconocido';

      const persona = await PersonaRepository.getById(user.persona);
      const nombreCompleto = persona
        ? `${persona.nombre} ${persona.apellido}`
        : 'Nombre desconocido';

      const label = `Usuario: ${rolNombre} ${nombreCompleto}`;

      res.json({
        usuario: user.usuario,
        rol: user.rol,          // 👈 ID numérico
        rolNombre,              // 👈 nombre del rol
        nombreCompleto,
        label
      });
    } catch (error) {
      console.error('❌ Error en getUserByName:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = AuthController;