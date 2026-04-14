// proyecto/backend/src/controllers/rubro.js
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

      if (!resultado) {
        return res.status(404).json({ error: 'Rubro no encontrado' });
      }

      res.json({ mensaje: 'Rubro eliminado correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar rubro:', err.message);

      // Si el error es por restricción de clave foránea
      if (err.message.includes('foreign key')) {
        return res.status(403).json({ error: err.message });
      }

      res.status(500).json({ error: 'Error interno al eliminar rubro' });
    }
  }
};

module.exports = RubroController;