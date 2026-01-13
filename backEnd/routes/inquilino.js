const express = require('express');
const router = express.Router();
const InquilinoController = require('../controllers/inquilino');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('inquilino', 'ver'), InquilinoController.getAll);
router.get('/:id', requierePermiso('inquilino', 'ver'), InquilinoController.getById);
router.post('/', requierePermiso('inquilino', 'editar'), InquilinoController.create);
router.put('/:id', requierePermiso('inquilino', 'editar'), InquilinoController.update);
router.delete('/:id', requierePermiso('inquilino', 'eliminar'), InquilinoController.delete);

module.exports = router;