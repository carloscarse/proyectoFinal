const express = require('express');
const router = express.Router();
const DireccionController = require('../controllers/direccion');
const requierePermiso = require('../middleware/permiso');

// GET todas las direcciones de una persona
router.get('/:personaId', requierePermiso('direccion', 'ver'), DireccionController.getAllByPersona);

// POST nueva dirección para una persona
router.post('/:personaId', requierePermiso('direccion', 'editar'), DireccionController.create);

// DELETE dirección por id
router.delete('/:id', requierePermiso('direccion', 'eliminar'), DireccionController.delete);

module.exports = router;