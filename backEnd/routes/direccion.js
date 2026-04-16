// proyecto/backEnd/routes/direccion.js
const express = require('express');
const router = express.Router();
const DireccionControlador = require('../controllers/direccion');

// 📌 Endpoints principales
router.get('/', DireccionControlador.obtenerDireccion);
router.get('/:id', DireccionControlador.obtenerDireccionPorId);
router.post('/', DireccionControlador.agregarDireccion);
router.put('/:id', DireccionControlador.actualizarDireccion);

// 🔹 Borrado lógico
router.delete('/:id', DireccionControlador.eliminarDireccion);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', DireccionControlador.eliminarDireccionFisico);

// 📌 Endpoints adicionales
router.get('/persona/:id', DireccionControlador.obtenerDireccionesPorPersonaId);

// 🔹 Endpoints para direcciones eliminadas (solo admins)
router.get('/eliminadas', DireccionControlador.obtenerDireccionesEliminadas);
router.get('/eliminadas/:id', DireccionControlador.obtenerDireccionEliminadaPorId);

module.exports = router;