// proyecto/backEnd/routes/espacio.js
const express = require('express');
const router = express.Router();
const EspacioControlador = require('../controllers/espacio');

// 📌 Endpoints principales
router.get('/', EspacioControlador.obtenerEspacios);
router.get('/:id', EspacioControlador.obtenerEspacioPorId);
router.post('/', EspacioControlador.agregarEspacio);
router.put('/:id', EspacioControlador.actualizarEspacio);

// 🔹 Borrado lógico
router.delete('/:id', EspacioControlador.eliminarEspacio);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', EspacioControlador.eliminarEspacioFisico);

// 📌 Endpoints para espacios eliminados (solo admins)
router.get('/eliminados', EspacioControlador.obtenerEspaciosEliminados);
router.get('/eliminados/:id', EspacioControlador.obtenerEspacioEliminadoPorId);

module.exports = router;