//backEnd/controllers/documentacion.js
const DocumentacionService = require('../services/documentacion');
const PermisoService = require('../services/permiso');

const DocumentacionController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'documentacion', 'ver');
      const data = await DocumentacionService.getAll();
      res.json(data.map(d => ({ ...d, label: d.documento })));
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'documentacion', 'ver');
      const d = await DocumentacionService.getById(req.params.id);
      res.json({ ...d, label: d.documento });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'documentacion', 'editar');
      const nuevo = await DocumentacionService.create(req.body);
      res.status(201).json({ ...nuevo, label: nuevo.documento });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'documentacion', 'editar');
      const actualizado = await DocumentacionService.update(req.params.id, req.body);
      res.json({ ...actualizado, label: actualizado.documento });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'documentacion', 'eliminar');
      const resultado = await DocumentacionService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = DocumentacionController;