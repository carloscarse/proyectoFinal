const ReservaService = require('../services/reserva');
const PermisoService = require('../services/permiso');

const ReservaController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'reserva', 'ver');
      const data = await ReservaService.getAll();
      res.json(data.map(r => ({ ...r, label: r.espacio })));
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'reserva', 'ver');
      const r = await ReservaService.getById(req.params.id);
      res.json({ ...r, label: r.espacio });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'reserva', 'editar');
      const nuevo = await ReservaService.create(req.body);
      res.status(201).json({ ...nuevo, label: nuevo.espacio });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'reserva', 'editar');
      const actualizado = await ReservaService.update(req.params.id, req.body);
      res.json({ ...actualizado, label: actualizado.espacio });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'reserva', 'eliminar');
      const resultado = await ReservaService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = ReservaController;