// proyecto/backEnd/controllers/auth.js

const AuthServicio = require('../services/auth');
const UsuarioRepositorio = require('../repositories/usuario');
const RolRepositorio = require('../repositories/rol');
const PersonaRepositorio = require('../repositories/persona');
const PermisoRepositorio = require('../repositories/permiso');

const AuthControlador = {
  async login(req, res) {
    const { usuario, clave } = req.body;
    try {
      const result = await AuthServicio.login(usuario, clave, req.ip);

      const user = await UsuarioRepositorio.obtenerUsuarioPorNombre(usuario);
      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado o eliminado' });
      }

      const rolData = await RolRepositorio.obtenerRolPorId(user.rol);
      const rolNombre = rolData?.rol || 'Rol desconocido';

      const persona = await PersonaRepositorio.obtenerPersonaPorId(user.persona);
      const nombreCompleto = persona
        ? `${persona.nombre} ${persona.apellido}`
        : 'Nombre desconocido';

      const label = `Usuario: ${rolNombre} ${nombreCompleto}`;
      const permisos = await PermisoRepositorio.permisosPorUsuario(user.usuario);

      res.json({
        id: user.id,
        usuario: user.usuario,
        rol: user.rol,
        rolNombre,
        nombreCompleto,
        label,
        permisos,
        token: result.token
      });
    } catch (error) {
      if (
        error.message === 'Usuario no encontrado' ||
        error.message === 'Usuario no encontrado o eliminado' ||
        error.message === 'Clave incorrecta'
      ) {
        return res.status(401).json({ error: error.message });
      }
      console.error("❌ Error en login:", error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getUserByName(req, res) {
    try {
      const { usuario } = req.params;

      const user = await UsuarioRepositorio.obtenerUsuarioPorNombre(usuario);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado o eliminado' });
      }

      const rolData = await RolRepositorio.obtenerRolPorId(user.rol);
      const rolNombre = rolData?.rol || 'Rol desconocido';

      const persona = await PersonaRepositorio.obtenerPersonaPorId(user.persona);
      const nombreCompleto = persona
        ? `${persona.nombre} ${persona.apellido}`
        : 'Nombre desconocido';

      const label = `Usuario: ${rolNombre} ${nombreCompleto}`;
      const permisos = await PermisoRepositorio.permisosPorUsuario(user.usuario);

      res.json({
        id: user.id,
        usuario: user.usuario,
        rol: user.rol,
        rolNombre,
        nombreCompleto,
        label,
        permisos
      });
    } catch (error) {
      console.error('❌ Error en getUserByName:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async logout(req, res) {
    try {
      const { usuario } = req.body;
      await AuthServicio.logout(usuario, req.ip);
      res.json({ ok: true });
    } catch (error) {
      console.error('❌ Error en logout:', error.message);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  },

  // 🚀 Nuevo endpoint: usuario autenticado con permisos
  async me(req, res) {
    try {
      const usuario = req.user; // viene del verifyToken
      const rolData = await RolRepositorio.obtenerRolPorId(usuario.rol);
      const rolNombre = rolData?.rol || 'Rol desconocido';

      const persona = await PersonaRepositorio.obtenerPersonaPorId(usuario.persona);
      const nombreCompleto = persona
        ? `${persona.nombre} ${persona.apellido}`
        : 'Nombre desconocido';

      const label = `Usuario: ${rolNombre} ${nombreCompleto}`;
      const permisos = await PermisoRepositorio.permisosPorUsuario(usuario.usuario);

      res.json({
        id: usuario.id,
        usuario: usuario.usuario,
        rol: usuario.rol,
        rolNombre,
        nombreCompleto,
        label,
        permisos
      });
    } catch (err) {
      console.error('❌ Error en me:', err.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

module.exports = AuthControlador;