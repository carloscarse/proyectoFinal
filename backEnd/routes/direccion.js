// proyecto/backEnd/routes/direccion.js
const express = require('express');
const router = express.Router();
const DireccionControlador = require('../controllers/direccion');

router.get('/', DireccionControlador.obtenerDireccion);
router.get('/:id', DireccionControlador.obtenerDireccionPorId);
router.post('/', DireccionControlador.agregarDireccion);
router.put('/:id', DireccionControlador.actualizarDireccion);
router.delete('/:id', DireccionControlador.eliminarDireccion);
router.get('/persona/:id', DireccionControlador.obtenerDireccionesPorPersonaId);

module.exports = router;