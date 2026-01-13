// proyecto/backend/src/controllers/telefono.js
const TelefonoService = require('../services/telefono');
const PermisoService = require('../services/permiso');

const TelefonoController = {
  async getAllByPersona(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'telefono', 'ver');
      const data = await TelefonoService.getAllByPersona(req.params.personaId);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'telefono', 'ver');
      const data = await TelefonoService.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Teléfono no encontrado' });
      }
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'telefono', 'editar');
      const nuevo = await TelefonoService.create(req.params.personaId, req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'telefono', 'editar');
      const actualizado = await TelefonoService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'telefono', 'eliminar');
      const resultado = await TelefonoService.delete(req.params.id);

      if (!resultado) {
        return res.status(404).json({ error: 'Teléfono no encontrado' });
      }

      res.json({ mensaje: 'Teléfono eliminado correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar teléfono:', err.message);
      res.status(500).json({ error: 'Error interno al eliminar teléfono' });
    }
  }
};

module.exports = TelefonoController;