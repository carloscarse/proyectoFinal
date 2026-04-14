// proyecto/backEnd/routes/logMovimiento.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // 👈 importar el middleware
const LogMovimientoControlador = require('../controllers/logMovimiento');

// 👇 proteger todas las rutas con verifyToken
router.post('/', verifyToken, LogMovimientoControlador.agregarLogMovimiento);
router.get('/', verifyToken, LogMovimientoControlador.obtenerLogMovimiento);
router.put('/:id', verifyToken, LogMovimientoControlador.actualizarLogMovimiento);
router.delete('/:id', verifyToken, LogMovimientoControlador.eliminarLogMovimiento);

module.exports = router;