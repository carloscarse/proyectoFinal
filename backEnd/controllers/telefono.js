// proyecto/backEnd/controllers/telefono.js

const TelefonoServicio = require('../services/telefono');

const TelefonoController = {
  async obtenerTelefono(req, res) {
    try {
      const telefonos = await TelefonoServicio.obtenerTelefono(req.user);
      res.json(telefonos);
    } catch (error) {
      console.error("❌ Error en obtenerTelefono:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerTelefonoPorId(req, res) {
    try {
      const telefono = await TelefonoServicio.obtenerTelefonoPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!telefono) {
        return res.status(404).json({ error: 'Teléfono no encontrado o eliminado' });
      }
      res.json(telefono);
    } catch (error) {
      console.error("❌ Error en obtenerTelefonoPorId:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async agregarTelefono(req, res) {
    try {
      const { persona, pais, cArea, numero } = req.body;
      if (!persona) {
        return res.status(400).json({ error: "El campo 'persona' es obligatorio" });
      }

      const nuevoTelefono = await TelefonoServicio.agregarTelefono(
        req.user,
        { persona, pais, cArea, numero },
        req.ip
      );

      res.status(201).json(nuevoTelefono);
    } catch (error) {
      console.error("❌ Error en agregarTelefono:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async actualizarTelefono(req, res) {
    try {
      await TelefonoServicio.actualizarTelefono(
        req.user,
        req.params.id,
        req.body,
        req.ip
      );
      res.json({ message: `Teléfono con id ${req.params.id} actualizado` });
    } catch (error) {
      console.error("❌ Error en actualizarTelefono:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async eliminarTelefono(req, res) {
    try {
      await TelefonoServicio.eliminarTelefono(
        req.user,
        req.params.id,
        req.ip
      );
      res.json({ message: `Teléfono con id ${req.params.id} eliminado` });
    } catch (error) {
      console.error("❌ Error en eliminarTelefono:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerTelefonosPorPersonaId(req, res) {
    try {
      const telefonos = await TelefonoServicio.obtenerTelefonosPorPersonaId(
        req.user,
        req.params.id,
        req.ip
      );
      res.json(telefonos);
    } catch (error) {
      console.error("❌ Error en obtenerTelefonosPorPersonaId:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = TelefonoController;