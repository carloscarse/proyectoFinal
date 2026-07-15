// proyecto/backEnd/controllers/espacio.js

const EspacioServicio = require('../services/espacio');

const EspacioControlador = {
  async obtenerEspacios(req, res) {
    try {
      const data = await EspacioServicio.obtenerEspacios(req.user);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerEspacios:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerEspacioPorId(req, res) {
    try {
      const data = await EspacioServicio.obtenerEspacioPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!data) {
        return res.status(404).json({ error: 'Espacio no encontrado o eliminado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerEspacioPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarEspacio(req, res) {
    try {
      const nuevoEspacio = await EspacioServicio.agregarEspacio(
        req.user,
        req.body,
        req.ip
      );
      res.status(201).json(nuevoEspacio);
    } catch (err) {
      console.error("❌ Error en agregarEspacio:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarEspacio(req, res) {
    try {
      const actualizado = await EspacioServicio.actualizarEspacio(
        req.user,
        req.params.id,
        req.body,
        req.ip
      );
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarEspacio:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarEspacio(req, res) {
    try {
      await EspacioServicio.eliminarEspacio(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Espacio con id ${req.params.id} marcado como borrado (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarEspacio:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarEspacioFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await EspacioServicio.eliminarEspacioFisico(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Espacio con id ${req.params.id} eliminado físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarEspacioFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerEspaciosEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await EspacioServicio.obtenerEspaciosEliminados(req.user, req.ip);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerEspaciosEliminados:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerEspacioEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await EspacioServicio.obtenerEspacioEliminadoPorId(req.user, req.params.id, req.ip);
      if (!data) {
        return res.status(404).json({ error: 'Espacio eliminado no encontrado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerEspacioEliminadoPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = EspacioControlador;