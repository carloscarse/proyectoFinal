// proyecto/backEnd/routes/logMovimiento.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const LogMovimientoControlador = require('../controllers/logMovimiento');

// 👇 proteger todas las rutas con verifyToken

// 📌 Endpoints principales
router.post('/', verifyToken, LogMovimientoControlador.agregarLogMovimiento);
router.get('/', verifyToken, LogMovimientoControlador.obtenerLogMovimiento);
router.get('/:id', verifyToken, LogMovimientoControlador.obtenerLogMovimientoPorId);
router.put('/:id', verifyToken, LogMovimientoControlador.actualizarLogMovimiento);

// 🔹 Borrado lógico
router.delete('/:id', verifyToken, LogMovimientoControlador.eliminarLogMovimiento);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', verifyToken, LogMovimientoControlador.eliminarLogMovimientoFisico);

// 📌 Endpoints para logs eliminados (solo admins)
router.get('/eliminados', verifyToken, LogMovimientoControlador.obtenerLogsEliminados);
router.get('/eliminados/:id', verifyToken, LogMovimientoControlador.obtenerLogEliminadoPorId);

module.exports = router;