// proyecto/backEnd/routes/telefono.js
const express = require('express');
const router = express.Router();
const TelefonoControlador = require('../controllers/telefono');

// 📌 Endpoints principales
router.get('/', TelefonoControlador.obtenerTelefono);
router.get('/:id', TelefonoControlador.obtenerTelefonoPorId);
router.post('/', TelefonoControlador.agregarTelefono);
router.put('/:id', TelefonoControlador.actualizarTelefono);

// 🔹 Borrado lógico
router.delete('/:id', TelefonoControlador.eliminarTelefono);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', TelefonoControlador.eliminarTelefonoFisico);

// 📌 Endpoints adicionales
router.get('/persona/:id', TelefonoControlador.obtenerTelefonosPorPersonaId);

// 🔹 Endpoints para teléfonos eliminados (solo admins)
router.get('/eliminados', TelefonoControlador.obtenerTelefonosEliminados);
router.get('/eliminados/:id', TelefonoControlador.obtenerTelefonoEliminadoPorId);

module.exports = router;