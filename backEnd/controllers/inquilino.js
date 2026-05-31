// proyecto/backEnd/controllers/inquilino.js

const InquilinoServicio = require('../services/inquilino');

const InquilinoControlador = {
  async obtenerInquilinos(req, res) {
    try {
      const data = await InquilinoServicio.obtenerInquilinos(req.user);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerInquilinos:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerInquilinoPorId(req, res) {
    try {
      const data = await InquilinoServicio.obtenerInquilinoPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!data) {
        return res.status(404).json({ error: 'Inquilino no encontrado o eliminado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerInquilinoPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarInquilino(req, res) {
    try {
      const nuevoInquilino = await InquilinoServicio.agregarInquilino(
        req.user,
        req.body,
        req.ip
      );
      res.status(201).json(nuevoInquilino);
    } catch (err) {
      console.error("❌ Error en agregarInquilino:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarInquilino(req, res) {
    try {
      const actualizado = await InquilinoServicio.actualizarInquilino(
        req.user,
        req.params.id,
        req.body,
        req.ip
      );
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarInquilino:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarInquilino(req, res) {
    try {
      await InquilinoServicio.eliminarInquilino(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Inquilino con id ${req.params.id} marcado como borrado (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarInquilino:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarInquilinoFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await InquilinoServicio.eliminarInquilinoFisico(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Inquilino con id ${req.params.id} eliminado físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarInquilinoFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerInquilinosEliminados(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await InquilinoServicio.obtenerInquilinosEliminados(req.user, req.ip);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerInquilinosEliminados:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerInquilinoEliminadoPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await InquilinoServicio.obtenerInquilinoEliminadoPorId(req.user, req.params.id, req.ip);
      if (!data) {
        return res.status(404).json({ error: 'Inquilino eliminado no encontrado' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerInquilinoEliminadoPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = InquilinoControlador;