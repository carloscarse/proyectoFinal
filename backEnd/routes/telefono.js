const express = require('express');
const router = express.Router();
const TelefonoController = require('../controllers/telefono');
const requierePermiso = require('../middleware/permiso');

// GET todos los teléfonos de una persona
router.get('/:personaId', requierePermiso('telefono', 'ver'), TelefonoController.getAllByPersona);

// GET teléfono por id
router.get('/detalle/:id', requierePermiso('telefono', 'ver'), TelefonoController.getById);

// POST nuevo teléfono para una persona
router.post('/:personaId', requierePermiso('telefono', 'editar'), TelefonoController.create);

// PUT actualizar teléfono por id
router.put('/:id', requierePermiso('telefono', 'editar'), TelefonoController.update);

// DELETE teléfono por id
router.delete('/:id', requierePermiso('telefono', 'eliminar'), TelefonoController.delete);

module.exports = router;