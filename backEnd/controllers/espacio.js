const EspacioService = require('../services/espacio');
const PermisoService = require('../services/permiso');

const EspacioController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'espacio', 'ver');
      const data = await EspacioService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'espacio', 'ver');
      const data = await EspacioService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'espacio', 'editar');
      const nuevo = await EspacioService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'espacio', 'editar');
      const actualizado = await EspacioService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'espacio', 'eliminar');
      const resultado = await EspacioService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = EspacioController;