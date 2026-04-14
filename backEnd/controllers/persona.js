// proyecto/backEnd/controllers/persona.js

const PersonaServicio = require('../services/persona');

const PersonaControlador = {
  async obtenerPersona(req, res) {
    try {
      const data = await PersonaServicio.obtenerPersona(req.user);
      res.json(data);
    } catch (err) {
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
      res.json(data);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },

  async agregarPersona(req, res) {
    try {
      // Crear persona
      const nuevaPersona = await PersonaServicio.agregarPersona(
        req.user,
        req.body,
        req.ip
      );

      // Devolver persona creada
      res.status(201).json(nuevaPersona);
    } catch (err) {
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
      res.status(403).json({ error: err.message });
    }
  },

  async eliminarPersona(req, res) {
    try {
      await PersonaServicio.eliminarPersona(req.user, req.params.id, req.ip);
      res.json({ mensaje: "Persona eliminada correctamente" });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
};

module.exports = PersonaControlador;