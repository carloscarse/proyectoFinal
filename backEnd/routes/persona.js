// proyecto/backEnd/routes/persona.js
const express = require('express');
const router = express.Router();
const PersonaControlador = require('../controllers/persona');

// 📌 Endpoints principales
router.get('/', PersonaControlador.obtenerPersona);
router.get('/:id', PersonaControlador.obtenerPersonaPorId);
router.post('/', PersonaControlador.agregarPersona);
router.put('/:id', PersonaControlador.actualizarPersona);

// 🔹 Borrado lógico
router.delete('/:id', PersonaControlador.eliminarPersona);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', PersonaControlador.eliminarPersonaFisico);

// 📌 Endpoints para personas eliminadas (solo admins)
router.get('/eliminadas', PersonaControlador.obtenerPersonasEliminadas);
router.get('/eliminadas/:id', PersonaControlador.obtenerPersonaEliminadaPorId);

module.exports = router;