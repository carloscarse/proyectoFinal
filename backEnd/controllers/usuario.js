// proyecto/backEnd/controllers/usuario.js
const UsuarioServicio = require('../services/usuario');
const PermisoServicio = require('../services/permiso');

const UsuarioControlador = {
  async obtenerUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'ver');
      const data = await UsuarioServicio.obtenerUsuario();
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerUsuario:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerUsuarioPorId(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'ver');
      const data = await UsuarioServicio.obtenerUsuarioPorId(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Usuario no encontrado o eliminado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerUsuarioPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'editar');
      const nuevo = await UsuarioServicio.agregarUsuario(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      console.error("❌ Error en agregarUsuario:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'editar');
      const actualizado = await UsuarioServicio.actualizarUsuario(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarUsuario:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'eliminar');
      await UsuarioServicio.eliminarUsuario(req.params.id);
      res.json({ message: `Usuario con id ${req.params.id} marcado como borrado (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarUsuario:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarUsuarioFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await UsuarioServicio.eliminarUsuarioFisico(req.params.id);
      res.json({ message: `Usuario con id ${req.params.id} eliminado físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarUsuarioFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerUsuariosEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await UsuarioServicio.obtenerUsuariosEliminados();
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerUsuariosEliminados:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerUsuarioEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await UsuarioServicio.obtenerUsuarioEliminadoPorId(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Usuario eliminado no encontrado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerUsuarioEliminadoPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = UsuarioControlador;