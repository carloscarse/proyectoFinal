// proyecto/backend/src/controllers/direccion.js
const DireccionService = require('../services/direccion');
const PermisoService = require('../services/permiso');

const DireccionController = {
  async getAllByPersona(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'direccion', 'ver');
      const data = await DireccionService.getAllByPersona(req.params.personaId);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'direccion', 'editar');
      const nueva = await DireccionService.create(req.params.personaId, req.body);
      res.status(201).json(nueva);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'direccion', 'eliminar');
      const resultado = await DireccionService.delete(req.params.id);

      if (!resultado) {
        return res.status(404).json({ error: 'Dirección no encontrada' });
      }

      res.json({ mensaje: 'Dirección eliminada correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar dirección:', err.message);
      res.status(500).json({ error: 'Error interno al eliminar dirección' });
    }
  }
};

module.exports = DireccionController;