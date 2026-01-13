const express = require('express');
const router = express.Router();
const EspacioController = require('../controllers/espacio');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('espacio', 'ver'), EspacioController.getAll);
router.get('/:id', requierePermiso('espacio', 'ver'), EspacioController.getById);
router.post('/', requierePermiso('espacio', 'editar'), EspacioController.create);
router.put('/:id', requierePermiso('espacio', 'editar'), EspacioController.update);
router.delete('/:id', requierePermiso('espacio', 'eliminar'), EspacioController.delete);

module.exports = router;