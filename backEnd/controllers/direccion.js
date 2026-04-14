// proyecto/backEnd/controllers/direccion.js

const DireccionServicio = require('../services/direccion');

const DireccionController = {
  async obtenerDireccion(req, res) {
    try {
      const direcciones = await DireccionServicio.obtenerDireccion(req.user);
      res.json(direcciones);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerDireccionPorId(req, res) {
    try {
      const direccion = await DireccionServicio.obtenerDireccionPorId(
        req.user,
        req.params.id,
        req.ip
      );
      res.json(direccion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async agregarDireccion(req, res) {
    try {
      // Validar que venga persona en el body
      const { persona } = req.body;
      if (!persona) {
        return res.status(400).json({ error: "El campo 'persona' es obligatorio" });
      }

      const nuevaDireccion = await DireccionServicio.agregarDireccion(
        req.user,
        req.body,
        req.ip
      );

      res.json(nuevaDireccion);
    } catch (error) {
      console.error("❌ Error en agregarDireccion:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async actualizarDireccion(req, res) {
    try {
      await DireccionServicio.actualizarDireccion(
        req.user,
        req.params.id,
        req.body,
        req.ip
      );
      res.json({ message: `Dirección con id ${req.params.id} actualizada` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async eliminarDireccion(req, res) {
    try {
      await DireccionServicio.eliminarDireccion(
        req.user,
        req.params.id,
        req.ip
      );
      res.json({ message: `Dirección con id ${req.params.id} eliminada` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerDireccionesPorPersonaId(req, res) {
    try {
      const direcciones = await DireccionServicio.obtenerDireccionesPorPersonaId(
        req.user,
        req.params.id,
        req.ip
      );
      res.json(direcciones);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = DireccionController;