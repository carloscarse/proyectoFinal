const PermisoService = require('../services/permiso');

const PermisoController = {
  async validar(req, res) {
    try {
      const { rol, recurso, accion } = req.body;

      if (!rol || !recurso || !accion) {
        return res.status(400).json({ error: 'Faltan datos: rol, recurso y accion son obligatorios' });
      }

      const permitido = await PermisoService.validarAcceso(rol, recurso, accion);
      res.json({ permitido });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = PermisoController;