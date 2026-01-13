const ItemPagoService = require('../services/itemPago');
const PermisoService = require('../services/permiso');

const ItemPagoController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'itemPago', 'ver');
      const data = await ItemPagoService.getAll();
      res.json(data.map(i => ({ ...i, label: i.item })));
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'itemPago', 'ver');
      const i = await ItemPagoService.getById(req.params.id);
      res.json({ ...i, label: i.item });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'itemPago', 'editar');
      const nuevo = await ItemPagoService.create(req.body);
      res.status(201).json({ ...nuevo, label: nuevo.item });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'itemPago', 'editar');
      const actualizado = await ItemPagoService.update(req.params.id, req.body);
      res.json({ ...actualizado, label: actualizado.item });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'itemPago', 'eliminar');
      const resultado = await ItemPagoService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = ItemPagoController;