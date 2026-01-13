const ArchivoService = require('../services/archivo');
const PermisoService = require('../services/permiso');

const ArchivoController = {
  async getAll(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'archivo', 'ver');
      const data = await ArchivoService.getAll();
      res.json(data.map(a => ({ ...a, label: a.nombreArchivo })));
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'archivo', 'ver');
      const a = await ArchivoService.getById(req.params.id);
      res.json({ ...a, label: a.nombreArchivo });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'archivo', 'editar');
      const nuevo = await ArchivoService.create(req.body);
      res.status(201).json({ ...nuevo, label: nuevo.nombreArchivo });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'archivo', 'editar');
      const actualizado = await ArchivoService.update(req.params.id, req.body);
      res.json({ ...actualizado, label: actualizado.nombreArchivo });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await PermisoService.validarAcceso(req.user.rol, 'archivo', 'eliminar');
      const resultado = await ArchivoService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = ArchivoController;