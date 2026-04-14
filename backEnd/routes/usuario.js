// proyecto/backEnd/routes/usuario.js
const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controllers/usuario');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('usuario', 'ver'), UsuarioControlador.obtenerUsuario);
router.get('/:id', requierePermiso('usuario', 'ver'), UsuarioControlador.obtenerUsuarioPorId);
router.post('/', requierePermiso('usuario', 'editar'), UsuarioControlador.agregarUsuario);
router.put('/:id', requierePermiso('usuario', 'editar'), UsuarioControlador.actualizarUsuario);
router.delete('/:id', requierePermiso('usuario', 'eliminar'), UsuarioControlador.eliminarUsuario);

module.exports = router;