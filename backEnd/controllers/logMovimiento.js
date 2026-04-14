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

      // 👤 tomar el id del usuario autenticado
      const idUsuario = req.user?.id;

      // 👉 ya no concatenamos "El usuario ..." aquí
      const id = await LogMovimientoServicio.agregarLogMovimiento({
        ...data,
        usuario: idUsuario,
        ip,
        detalle: data.detalle   // se pasa limpio, el servicio arma la frase final
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

  async actualizarLogMovimiento(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await LogMovimientoServicio.actualizarLogMovimiento(id, data);
      res.json({ ok: true });
    } catch (err) {
      console.error("❌ Error al actualizar logMovimiento:", err.message);
      res.status(500).json({ error: "Error al actualizar logMovimiento" });
    }
  },

  async eliminarLogMovimiento(req, res) {
    try {
      const id = req.params.id;
      await LogMovimientoServicio.eliminarLogMovimiento(id);
      res.json({ ok: true });
    } catch (err) {
      console.error("❌ Error al eliminar logMovimiento:", err.message);
      res.status(500).json({ error: "Error al eliminar logMovimiento" });
    }
  }
};

module.exports = LogMovimientoControlador;