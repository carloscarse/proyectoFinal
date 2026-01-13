const FacturaService = require('../services/factura');
const PermisoService = require('../services/permiso');

const FacturaController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'factura', 'ver');
      const data = await FacturaService.getAll();
      res.json(data.map(f => ({ ...f, label: f.numeroFactura })));
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'factura', 'ver');
      const f = await FacturaService.getById(req.params.id);
      res.json({ ...f, label: f.numeroFactura });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'factura', 'editar');
      const nuevo = await FacturaService.create(req.body);
      res.status(201).json({ ...nuevo, label: nuevo.numeroFactura });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'factura', 'editar');
      const actualizado = await FacturaService.update(req.params.id, req.body);
      res.json({ ...actualizado, label: actualizado.numeroFactura });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'factura', 'eliminar');
      const resultado = await FacturaService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = FacturaController;