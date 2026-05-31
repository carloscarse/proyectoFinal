// proyecto/backEnd/routes/inquilino.js
const express = require('express');
const router = express.Router();
const InquilinoControlador = require('../controllers/inquilino');

// 📌 Endpoints principales
router.get('/', InquilinoControlador.obtenerInquilinos);
router.get('/:id', InquilinoControlador.obtenerInquilinoPorId);
router.post('/', InquilinoControlador.agregarInquilino);
router.put('/:id', InquilinoControlador.actualizarInquilino);

// 🔹 Borrado lógico
router.delete('/:id', InquilinoControlador.eliminarInquilino);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', InquilinoControlador.eliminarInquilinoFisico);

// 📌 Endpoints para inquilinos eliminados (solo admins)
router.get('/eliminados', InquilinoControlador.obtenerInquilinosEliminados);
router.get('/eliminados/:id', InquilinoControlador.obtenerInquilinoEliminadoPorId);

module.exports = router;