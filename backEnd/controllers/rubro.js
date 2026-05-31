// proyecto/backEnd/controllers/rubro.js

const RubroServicio = require('../services/rubro');

const RubroControlador = {
  async obtenerRubros(req, res) {
    try {
      const data = await RubroServicio.obtenerRubros(req.user);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRubros:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRubroPorId(req, res) {
    try {
      const data = await RubroServicio.obtenerRubroPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!data) {
        return res.status(404).json({ error: 'Rubro no encontrado o eliminado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRubroPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarRubro(req, res) {
    try {
      const nuevoRubro = await RubroServicio.agregarRubro(
        req.user,
        req.body,
        req.ip
      );
      res.status(201).json(nuevoRubro);
    } catch (err) {
      console.error("❌ Error en agregarRubro:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarRubro(req, res) {
    try {
      const actualizado = await RubroServicio.actualizarRubro(
        req.user,
        req.params.id,
        req.body,
        req.ip
      );
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarRubro:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarRubro(req, res) {
    try {
      await RubroServicio.eliminarRubro(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Rubro con id ${req.params.id} marcado como borrado (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarRubro:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarRubroFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await RubroServicio.eliminarRubroFisico(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Rubro con id ${req.params.id} eliminado físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarRubroFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRubrosEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await RubroServicio.obtenerRubrosEliminados(req.user, req.ip);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRubrosEliminados:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerRubroEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await RubroServicio.obtenerRubroEliminadoPorId(req.user, req.params.id, req.ip);
      if (!data) {
        return res.status(404).json({ error: 'Rubro eliminado no encontrado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerRubroEliminadoPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = RubroControlador;