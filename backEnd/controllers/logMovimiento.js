// proyecto/backEnd/controllers/logMovimiento.js

const LogMovimientoServicio = require('../services/logMovimiento');

const LogMovimientoControlador = {
  async agregarLogMovimiento(req, res) {
    try {
      const data = req.body;

      const ip =
        req.headers['x-forwarded-for']?.split(',')[0].trim() ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        null;

      const idUsuario = req.user?.id;

      const id = await LogMovimientoServicio.agregarLogMovimiento({
        ...data,
        usuario: idUsuario,
        ip,
        detalle: data.detalle
      });

      res.json({ ok: true, id });
    } catch (err) {
      console.error("❌ Error al registrar logMovimiento:", err.message);
      res.status(500).json({ error: "Error al registrar logMovimiento" });
    }
  },

  async obtenerLogMovimiento(req, res) {
    try {
      const logs = await LogMovimientoServicio.obtenerLogMovimiento();
      res.json(logs);
    } catch (err) {
      console.error("❌ Error al obtener logMovimiento:", err.message);
      res.status(500).json({ error: "Error al obtener logMovimiento" });
    }
  },

  async obtenerLogMovimientoPorId(req, res) {
    try {
      const log = await LogMovimientoServicio.obtenerLogMovimientoPorId(req.params.id);
      if (!log) {
        return res.status(404).json({ error: 'LogMovimiento no encontrado o eliminado' });
      }
      res.json(log);
    } catch (err) {
      console.error("❌ Error al obtener logMovimientoPorId:", err.message);
      res.status(500).json({ error: "Error al obtener logMovimientoPorId" });
    }
  },

  async actualizarLogMovimiento(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await LogMovimientoServicio.actualizarLogMovimiento(id, data);
      res.json({ ok: true, message: `LogMovimiento con id ${id} actualizado` });
    } catch (err) {
      console.error("❌ Error al actualizar logMovimiento:", err.message);
      res.status(500).json({ error: "Error al actualizar logMovimiento" });
    }
  },

  // 🔹 Borrado lógico
  async eliminarLogMovimiento(req, res) {
    try {
      const id = req.params.id;
      await LogMovimientoServicio.eliminarLogMovimiento(id);
      res.json({ ok: true, message: `LogMovimiento con id ${id} marcado como borrado (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error al eliminar logMovimiento:", err.message);
      res.status(500).json({ error: "Error al eliminar logMovimiento" });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarLogMovimientoFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const id = req.params.id;
      await LogMovimientoServicio.eliminarLogMovimientoFisico(id);
      res.json({ ok: true, message: `LogMovimiento con id ${id} eliminado físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error al eliminarLogMovimientoFisico:", err.message);
      res.status(500).json({ error: "Error al eliminar logMovimiento físicamente" });
    }
  },

  async obtenerLogsEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const logs = await LogMovimientoServicio.obtenerLogsEliminados();
      res.json(logs);
    } catch (err) {
      console.error("❌ Error al obtenerLogsEliminados:", err.message);
      res.status(500).json({ error: "Error al obtener logs eliminados" });
    }
  },

  async obtenerLogEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const log = await LogMovimientoServicio.obtenerLogEliminadoPorId(req.params.id);
      if (!log) {
        return res.status(404).json({ error: 'LogMovimiento eliminado no encontrado' });
      }
      res.json(log);
    } catch (err) {
      console.error("❌ Error al obtenerLogEliminadoPorId:", err.message);
      res.status(500).json({ error: "Error al obtener logMovimiento eliminado por id" });
    }
  }
};

module.exports = LogMovimientoControlador;