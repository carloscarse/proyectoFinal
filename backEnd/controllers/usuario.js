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
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerUsuarioPorId(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'ver');
      const data = await UsuarioServicio.obtenerUsuarioPorId(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async agregarUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'editar');
      const nuevo = await UsuarioServicio.agregarUsuario(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'editar');
      const actualizado = await UsuarioServicio.actualizarUsuario(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async eliminarUsuario(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'usuario', 'eliminar');
      const resultado = await UsuarioServicio.eliminarUsuario(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = UsuarioControlador;