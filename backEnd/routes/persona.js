// proyecto/backEnd/routes/persona.js
const express = require('express');
const router = express.Router();
const PersonaControlador = require('../controllers/persona');

router.get('/', PersonaControlador.obtenerPersona);
router.get('/:id', PersonaControlador.obtenerPersonaPorId);
router.post('/', PersonaControlador.agregarPersona);
router.put('/:id', PersonaControlador.actualizarPersona);
router.delete('/:id', PersonaControlador.eliminarPersona);

module.exports = router;