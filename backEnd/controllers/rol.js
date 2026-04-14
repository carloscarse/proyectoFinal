// proyecto/backEnd/controllers/rol.js
const RolServicio = require('../services/rol');
const PermisoServicio = require('../services/permiso');

const RolControlador = {
  async obtenerRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'ver');
      const data = await RolServicio.obtenerRol();
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRolPorId(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'ver');
      const data = await RolServicio.obtenerRolPorId(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async agregarRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'editar');
      const nuevo = await RolServicio.agregarRol(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'editar');
      const actualizado = await RolServicio.actualizarRol(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async eliminarRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'eliminar');
      const resultado = await RolServicio.eliminarRol(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = RolControlador;