const ServicioService = require('../services/servicio');
const PermisoService = require('../services/permiso');

const ServicioController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'servicio', 'ver');
      const data = await ServicioService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'servicio', 'ver');
      const data = await ServicioService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'servicio', 'editar');
      const nuevo = await ServicioService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'servicio', 'editar');
      const actualizado = await ServicioService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'servicio', 'eliminar');
      const resultado = await ServicioService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = ServicioController;