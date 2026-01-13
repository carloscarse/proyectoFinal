const PersonaService = require('../services/persona');
const PermisoService = require('../services/permiso');

const PersonaController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'persona', 'ver');
      const data = await PersonaService.getAll();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'persona', 'ver');
      const data = await PersonaService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'persona', 'editar');
      const nuevo = await PersonaService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'persona', 'editar');
      const actualizado = await PersonaService.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'persona', 'eliminar');
      const resultado = await PersonaService.delete(req.params.id);

      if (!resultado) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }

      res.json({ mensaje: 'Persona eliminada correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar persona:', err.message);

      // Si el error es por restricción de clave foránea
      if (err.message.includes('foreign key')) {
        return res.status(403).json({ error: err.message });
      }

      res.status(500).json({ error: 'Error interno al eliminar persona' });
    }
  }
};

module.exports = PersonaController;