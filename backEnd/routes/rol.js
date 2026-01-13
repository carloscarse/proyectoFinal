const express = require('express');
const router = express.Router();
const RolController = require('../controllers/rol');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('rol', 'ver'), RolController.getAll);
router.get('/:id', requierePermiso('rol', 'ver'), RolController.getById);
router.post('/', requierePermiso('rol', 'editar'), RolController.create);
router.put('/:id', requierePermiso('rol', 'editar'), RolController.update);
router.delete('/:id', requierePermiso('rol', 'eliminar'), RolController.delete);

module.exports = router;