// proyecto/backEnd/controllers/direccion.js

const DireccionServicio = require('../services/direccion');

const DireccionController = {
  async obtenerDireccion(req, res) {
    try {
      const direcciones = await DireccionServicio.obtenerDireccion(req.user);
      res.json(direcciones);
    } catch (error) {
      console.error("❌ Error en obtenerDireccion:", error.message);
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
      if (!direccion) {
        return res.status(404).json({ error: 'Dirección no encontrada o eliminada' });
      }
      res.json(direccion);
    } catch (error) {
      console.error("❌ Error en obtenerDireccionPorId:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async agregarDireccion(req, res) {
    try {
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
      console.error("❌ Error en actualizarDireccion:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // 🔹 Borrado lógico
  async eliminarDireccion(req, res) {
    try {
      await DireccionServicio.eliminarDireccion(
        req.user,
        req.params.id,
        req.ip
      );
      res.json({ message: `Dirección con id ${req.params.id} marcada como borrada (borrado lógico)` });
    } catch (error) {
      console.error("❌ Error en eliminarDireccion:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // 🔹 Borrado físico (solo admins)
  async eliminarDireccionFisico(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }

      await DireccionServicio.eliminarDireccionFisico(
        req.user,
        req.params.id,
        req.ip
      );
      res.json({ message: `Dirección con id ${req.params.id} eliminada físicamente (borrado definitivo)` });
    } catch (error) {
      console.error("❌ Error en eliminarDireccionFisico:", error.message);
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
      console.error("❌ Error en obtenerDireccionesPorPersonaId:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerDireccionesEliminadas(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }

      const direcciones = await DireccionServicio.obtenerDireccionesEliminadas(
        req.user,
        req.ip
      );
      res.json(direcciones);
    } catch (error) {
      console.error("❌ Error en obtenerDireccionesEliminadas:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerDireccionEliminadaPorId(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acción no permitida: solo administradores' });
      }

      const direccion = await DireccionServicio.obtenerDireccionEliminadaPorId(
        req.user,
        req.params.id,
        req.ip
      );
      if (!direccion) {
        return res.status(404).json({ error: 'Dirección eliminada no encontrada' });
      }
      res.json(direccion);
    } catch (error) {
      console.error("❌ Error en obtenerDireccionEliminadaPorId:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = DireccionController;