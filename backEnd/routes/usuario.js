// proyecto/backEnd/routes/usuario.js
const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controllers/usuario');
const requierePermiso = require('../middleware/permiso');

// 📌 Endpoints principales
router.get('/', requierePermiso('usuario', 'ver'), UsuarioControlador.obtenerUsuario);
router.get('/:id', requierePermiso('usuario', 'ver'), UsuarioControlador.obtenerUsuarioPorId);
router.post('/', requierePermiso('usuario', 'editar'), UsuarioControlador.agregarUsuario);
router.put('/:id', requierePermiso('usuario', 'editar'), UsuarioControlador.actualizarUsuario);

// 🔹 Borrado lógico
router.delete('/:id', requierePermiso('usuario', 'eliminar'), UsuarioControlador.eliminarUsuario);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', requierePermiso('usuario', 'eliminar'), UsuarioControlador.eliminarUsuarioFisico);

// 📌 Endpoints para usuarios eliminados (solo admins)
router.get('/eliminados', requierePermiso('usuario', 'ver'), UsuarioControlador.obtenerUsuariosEliminados);
router.get('/eliminados/:id', requierePermiso('usuario', 'ver'), UsuarioControlador.obtenerUsuarioEliminadoPorId);

module.exports = router;