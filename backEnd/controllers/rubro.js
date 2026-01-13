const RubroService = require('../services/rubro');
const PermisoService = require('../services/permiso');

const RubroController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'rubro', 'ver');
      const data = await RubroService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'rubro', 'ver');
      const data = await RubroService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'rubro', 'editar');
      const nuevo = await RubroService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'rubro', 'editar');
      const actualizado = await RubroService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'rubro', 'eliminar');
      const resultado = await RubroService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = RubroController;