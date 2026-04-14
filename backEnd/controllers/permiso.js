const PermisoServicio = require('../services/permiso');

const PermisoControlador = {
  async validar(req, res) {
    try {
      const { rol, recurso, accion } = req.body;
      if (!rol || !recurso || !accion) {
        return res.status(400).json({ error: 'Faltan datos: rol, recurso y accion son obligatorios' });
      }
      const permitido = await PermisoServicio.validarAcceso(rol, recurso, accion);
      res.json({ permitido });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerPermiso(req, res) {
    try {
      const data = await PermisoServicio.obtenerPermiso();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async obtenerPermisoPorId(req, res) {
    try {
      const data = await PermisoServicio.obtenerPermisoPorId(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async agregarPermiso(req, res) {
    try {
      const nuevo = await PermisoServicio.agregarPermiso(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async actualizarPermiso(req, res) {
    try {
      const actualizado = await PermisoServicio.actualizarPermiso(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async eliminarPermiso(req, res) {
    try {
      const resultado = await PermisoServicio.eliminarPermiso(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = PermisoControlador;