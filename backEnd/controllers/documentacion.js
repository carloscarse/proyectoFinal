// proyecto/backEnd/controllers/documentacion.js

const DocumentacionServicio = require('../services/documentacion');

const DocumentacionControlador = {
  async obtenerDocumentacion(req, res) {
    try {
      const data = await DocumentacionServicio.obtenerDocumentacion(req.user);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerDocumentacion:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerDocumentacionPorId(req, res) {
    try {
      const data = await DocumentacionServicio.obtenerDocumentacionPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!data) {
        return res.status(404).json({ error: 'Documentación no encontrada o eliminada' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerDocumentacionPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarDocumentacion(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'El archivo documento es requerido' });
      }
      
      // Pasamos req.body + el filename de multer
      const dataConArchivo = {
        ...req.body,
        documento: req.file.filename
      };

      const nuevaDocumentacion = await DocumentacionServicio.agregarDocumentacion(
        req.user,
        dataConArchivo,
        req.ip
      );
      res.status(201).json(nuevaDocumentacion);
    } catch (err) {
      console.error("❌ Error en agregarDocumentacion:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarDocumentacion(req, res) {
    try {
      // Si hay archivo nuevo, lo agregamos al body
      const dataConArchivo = {
        ...req.body,
        documento: req.file ? req.file.filename : undefined
      };

      const actualizado = await DocumentacionServicio.actualizarDocumentacion(
        req.user,
        req.params.id,
        dataConArchivo,
        req.ip
      );
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarDocumentacion:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarDocumentacion(req, res) {
    try {
      await DocumentacionServicio.eliminarDocumentacion(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Documentación con id ${req.params.id} marcada como borrada (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarDocumentacion:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarDocumentacionFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await DocumentacionServicio.eliminarDocumentacionFisico(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Documentación con id ${req.params.id} eliminada físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarDocumentacionFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerDocumentacionesEliminadas(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await DocumentacionServicio.obtenerDocumentacionesEliminadas(req.user, req.ip);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerDocumentacionesEliminadas:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerDocumentacionEliminadaPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await DocumentacionServicio.obtenerDocumentacionEliminadaPorId(req.user, req.params.id, req.ip);
      if (!data) {
        return res.status(404).json({ error: 'Documentación eliminada no encontrada' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerDocumentacionEliminadaPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = DocumentacionControlador;