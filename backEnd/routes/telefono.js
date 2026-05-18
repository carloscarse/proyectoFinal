// proyecto/backEnd/routes/telefono.js
const express = require('express');
const router = express.Router();
const TelefonoControlador = require('../controllers/telefono');

// 📌 Endpoints principales
router.get('/', TelefonoControlador.obtenerTelefono);
router.get('/persona/:id', TelefonoControlador.obtenerTelefonosPorPersonaId);
router.get('/:id', TelefonoControlador.obtenerTelefonoPorId);
router.post('/', TelefonoControlador.agregarTelefono);
router.put('/:id', TelefonoControlador.actualizarTelefono);
router.delete('/:id', TelefonoControlador.eliminarTelefono);

module.exports = router;