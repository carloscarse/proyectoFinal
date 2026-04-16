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
      console.error("❌ Error en obtenerRol:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRolPorId(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'ver');
      const data = await RolServicio.obtenerRolPorId(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Rol no encontrado o eliminado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRolPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'editar');
      const nuevo = await RolServicio.agregarRol(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      console.error("❌ Error en agregarRol:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'editar');
      const actualizado = await RolServicio.actualizarRol(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarRol:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarRol(req, res) {
    try {
      await PermisoServicio.validarAcceso(req.user.rol, 'rol', 'eliminar');
      await RolServicio.eliminarRol(req.params.id);
      res.json({ message: `Rol con id ${req.params.id} marcado como borrado (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarRol:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarRolFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await RolServicio.eliminarRolFisico(req.params.id);
      res.json({ message: `Rol con id ${req.params.id} eliminado físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarRolFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRolesEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await RolServicio.obtenerRolesEliminados();
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRolesEliminados:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRolEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await RolServicio.obtenerRolEliminadoPorId(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Rol eliminado no encontrado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRolEliminadoPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = RolControlador;