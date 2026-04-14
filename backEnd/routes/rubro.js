// proyecto/backend/src/routes/rubro.js
const express = require('express');
const router = express.Router();
const RubroController = require('../controllers/rubro');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('rubro', 'ver'), RubroController.getAll);
router.get('/:id', requierePermiso('rubro', 'ver'), RubroController.getById);
router.post('/', requierePermiso('rubro', 'editar'), RubroController.create);
router.put('/:id', requierePermiso('rubro', 'editar'), RubroController.update);
router.delete('/:id', requierePermiso('rubro', 'eliminar'), RubroController.delete);

module.exports = router;