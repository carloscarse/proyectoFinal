const InquilinoService = require('../services/inquilino');
const PermisoService = require('../services/permiso');

const InquilinoController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'inquilino', 'ver');
      const data = await InquilinoService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'inquilino', 'ver');
      const data = await InquilinoService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'inquilino', 'editar');
      const nuevo = await InquilinoService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'inquilino', 'editar');
      const actualizado = await InquilinoService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'inquilino', 'eliminar');
      const resultado = await InquilinoService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = InquilinoController;