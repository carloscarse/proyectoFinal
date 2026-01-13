const ContratoService = require('../services/contrato');
const PermisoService = require('../services/permiso');

const ContratoController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'contrato', 'ver');
      const data = await ContratoService.getAll();
      res.json(data.map(c => ({ ...c, label: c.numeroContrato })));
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'contrato', 'ver');
      const c = await ContratoService.getById(req.params.id);
      res.json({ ...c, label: c.numeroContrato });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'contrato', 'editar');
      const nuevo = await ContratoService.create(req.body);
      res.status(201).json({ ...nuevo, label: nuevo.numeroContrato });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'contrato', 'editar');
      const actualizado = await ContratoService.update(req.params.id, req.body);
      res.json({ ...actualizado, label: actualizado.numeroContrato });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'contrato', 'eliminar');
      const resultado = await ContratoService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = ContratoController;