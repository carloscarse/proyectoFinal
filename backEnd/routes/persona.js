const express = require('express');
const router = express.Router();
const PersonaController = require('../controllers/persona');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('persona', 'ver'), PersonaController.getAll);
router.get('/:id', requierePermiso('persona', 'ver'), PersonaController.getById);
router.post('/', requierePermiso('persona', 'editar'), PersonaController.create);
router.put('/:id', requierePermiso('persona', 'editar'), PersonaController.update);
router.delete('/:id', requierePermiso('persona', 'eliminar'), PersonaController.delete);

module.exports = router;