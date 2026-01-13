const express = require('express');
const router = express.Router();
const ServicioController = require('../controllers/servicio');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('servicio', 'ver'), ServicioController.getAll);
router.get('/:id', requierePermiso('servicio', 'ver'), ServicioController.getById);
router.post('/', requierePermiso('servicio', 'editar'), ServicioController.create);
router.put('/:id', requierePermiso('servicio', 'editar'), ServicioController.update);
router.delete('/:id', requierePermiso('servicio', 'eliminar'), ServicioController.delete);

module.exports = router;