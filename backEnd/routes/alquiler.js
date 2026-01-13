const express = require('express');
const router = express.Router();
const AlquilerController = require('../controllers/alquiler');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('alquiler', 'ver'), AlquilerController.getAll);
router.get('/:id', requierePermiso('alquiler', 'ver'), AlquilerController.getById);
router.post('/', requierePermiso('alquiler', 'editar'), AlquilerController.create);
router.put('/:id', requierePermiso('alquiler', 'editar'), AlquilerController.update);
router.delete('/:id', requierePermiso('alquiler', 'eliminar'), AlquilerController.delete);

module.exports = router;