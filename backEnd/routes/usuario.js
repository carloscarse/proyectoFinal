const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('usuario', 'ver'), UsuarioController.getAll);
router.get('/:id', requierePermiso('usuario', 'ver'), UsuarioController.getById);
router.post('/', requierePermiso('usuario', 'editar'), UsuarioController.create);
router.put('/:id', requierePermiso('usuario', 'editar'), UsuarioController.update);
router.delete('/:id', requierePermiso('usuario', 'eliminar'), UsuarioController.delete);

module.exports = router;