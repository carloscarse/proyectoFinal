const UsuarioService = require('../services/usuario');
const PermisoService = require('../services/permiso');

const UsuarioController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'usuario', 'ver');
      const data = await UsuarioService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'usuario', 'ver');
      const data = await UsuarioService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'usuario', 'editar');
      const nuevo = await UsuarioService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'usuario', 'editar');
      const actualizado = await UsuarioService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'usuario', 'eliminar');
      const resultado = await UsuarioService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = UsuarioController;