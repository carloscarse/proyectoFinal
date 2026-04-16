// proyecto/backEnd/routes/rol.js
const express = require('express');
const router = express.Router();
const RolControlador = require('../controllers/rol');
const requierePermiso = require('../middleware/permiso');

// 📌 Endpoints principales
router.get('/', requierePermiso('rol', 'ver'), RolControlador.obtenerRol);
router.get('/:id', requierePermiso('rol', 'ver'), RolControlador.obtenerRolPorId);
router.post('/', requierePermiso('rol', 'editar'), RolControlador.agregarRol);
router.put('/:id', requierePermiso('rol', 'editar'), RolControlador.actualizarRol);

// 🔹 Borrado lógico
router.delete('/:id', requierePermiso('rol', 'eliminar'), RolControlador.eliminarRol);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', requierePermiso('rol', 'eliminar'), RolControlador.eliminarRolFisico);

// 📌 Endpoints para roles eliminados (solo admins)
router.get('/eliminados', requierePermiso('rol', 'ver'), RolControlador.obtenerRolesEliminados);
router.get('/eliminados/:id', requierePermiso('rol', 'ver'), RolControlador.obtenerRolEliminadoPorId);

module.exports = router;