const PagoService = require('../services/pago');
const PermisoService = require('../services/permiso');

const PagoController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'pago', 'ver');
      const data = await PagoService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'pago', 'ver');
      const data = await PagoService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'pago', 'editar');
      const nuevo = await PagoService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'pago', 'editar');
      const actualizado = await PagoService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'pago', 'eliminar');
      const resultado = await PagoService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = PagoController;