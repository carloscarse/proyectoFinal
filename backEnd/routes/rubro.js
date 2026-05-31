// proyecto/backEnd/routes/rubro.js
const express = require('express');
const router = express.Router();
const RubroControlador = require('../controllers/rubro');

// 📌 Endpoints principales
router.get('/', RubroControlador.obtenerRubros);
router.get('/:id', RubroControlador.obtenerRubroPorId);
router.post('/', RubroControlador.agregarRubro);
router.put('/:id', RubroControlador.actualizarRubro);

// 🔹 Borrado lógico
router.delete('/:id', RubroControlador.eliminarRubro);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', RubroControlador.eliminarRubroFisico);

// 📌 Endpoints para rubros eliminados (solo admins)
router.get('/eliminados', RubroControlador.obtenerRubrosEliminados);
router.get('/eliminados/:id', RubroControlador.obtenerRubroEliminadoPorId);

module.exports = router;