// proyecto/backEnd/controllers/persona.js

const PersonaServicio = require('../services/persona');

const PersonaControlador = {
  async obtenerPersona(req, res) {
    try {
      const data = await PersonaServicio.obtenerPersona(req.user);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPersona:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerPersonaPorId(req, res) {
    try {
      const data = await PersonaServicio.obtenerPersonaPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!data) {
        return res.status(404).json({ error: 'Persona no encontrada o eliminada' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPersonaPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async agregarPersona(req, res) {
    try {
      const nuevaPersona = await PersonaServicio.agregarPersona(
        req.user,
        req.body,
        req.ip
      );
      res.status(201).json(nuevaPersona);
    } catch (err) {
      console.error("❌ Error en agregarPersona:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async actualizarPersona(req, res) {
    try {
      const actualizado = await PersonaServicio.actualizarPersona(
        req.user,
        req.params.id,
        req.body,
        req.ip
      );
      res.json(actualizado);
    } catch (err) {
      console.error("❌ Error en actualizarPersona:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarPersona(req, res) {
    try {
      await PersonaServicio.eliminarPersona(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Persona con id ${req.params.id} marcada como borrada (borrado lógico)` });
    } catch (err) {
      console.error("❌ Error en eliminarPersona:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarPersonaFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      await PersonaServicio.eliminarPersonaFisico(req.user, req.params.id, req.ip);
      res.json({ mensaje: `Persona con id ${req.params.id} eliminada físicamente (borrado definitivo)` });
    } catch (err) {
      console.error("❌ Error en eliminarPersonaFisico:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerPersonasEliminadas(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await PersonaServicio.obtenerPersonasEliminadas(req.user, req.ip);
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPersonasEliminadas:", err.message);
      res.status(403).json({ error: err.message });
    }
  },

  async obtenerPersonaEliminadaPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }
      const data = await PersonaServicio.obtenerPersonaEliminadaPorId(req.user, req.params.id, req.ip);
      if (!data) {
        return res.status(404).json({ error: 'Persona eliminada no encontrada' });
      }
      res.json(data);
    } catch (err) {
      console.error("❌ Error en obtenerPersonaEliminadaPorId:", err.message);
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = PersonaControlador;