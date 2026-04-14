// proyecto/backEnd/routes/telefono.js
const express = require('express');
const router = express.Router();
const TelefonoControlador = require('../controllers/telefono');

router.get('/', TelefonoControlador.obtenerTelefono);
router.get('/:id', TelefonoControlador.obtenerTelefonoPorId);
router.post('/', TelefonoControlador.agregarTelefono);
router.put('/:id', TelefonoControlador.actualizarTelefono);
router.delete('/:id', TelefonoControlador.eliminarTelefono);
router.get('/persona/:id', TelefonoControlador.obtenerTelefonosPorPersonaId);

module.exports = router;