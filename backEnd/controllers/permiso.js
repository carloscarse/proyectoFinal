// proyecto/backEnd/controllers/permiso.js

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
      console.error("❌ Error en validar:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerPermiso(req, res) {
    try {
      const data = await PermisoServicio.obtenerPermiso();
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPermiso:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  async obtenerPermisoPorId(req, res) {
    try {
      const data = await PermisoServicio.obtenerPermisoPorId(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Permiso no encontrado o eliminado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPermisoPorId:", err.message);
      res.status(404).json({ error: err.message });
    }
  },

  async agregarPermiso(req, res) {
    try {
      const nuevo = await PermisoServicio.agregarPermiso(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      console.error("❌ Error en agregarPermiso:", err.message);
      res.status(400).json({ error: err.message });
    }
  },

  async actualizarPermiso(req, res) {
    try {
      const actualizado = await PermisoServicio.actualizarPermiso(req.params.id, req.body);
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarPermiso:", err.message);
      res.status(400).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarPermiso(req, res) {
    try {
      const resultado = await PermisoServicio.eliminarPermiso(req.params.id);
      res.json({ message: `Permiso con id ${req.params.id} marcado como borrado (borrado lógico)`, resultado });
    } catch (err) {
      console.error("❌ Error en eliminarPermiso:", err.message);
      res.status(400).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarPermisoFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const resultado = await PermisoServicio.eliminarPermisoFisico(req.params.id);
      res.json({ message: `Permiso con id ${req.params.id} eliminado físicamente (borrado definitivo)`, resultado });
    } catch (err) {
      console.error("❌ Error en eliminarPermisoFisico:", err.message);
      res.status(400).json({ error: err.message });
    }
  },

  async obtenerPermisosEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await PermisoServicio.obtenerPermisosEliminados();
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPermisosEliminados:", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  async obtenerPermisoEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await PermisoServicio.obtenerPermisoEliminadoPorId(req.params.id);
      if (!data) {
        return res.status(404).json({ error: 'Permiso eliminado no encontrado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPermisoEliminadoPorId:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = PermisoControlador;