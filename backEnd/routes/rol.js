// proyecto/backEnd/routes/rol.js
const express = require('express');
const router = express.Router();
const RolControlador = require('../controllers/rol');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('rol', 'ver'), RolControlador.obtenerRol);
router.get('/:id', requierePermiso('rol', 'ver'), RolControlador.obtenerRolPorId);
router.post('/', requierePermiso('rol', 'editar'), RolControlador.agregarRol);
router.put('/:id', requierePermiso('rol', 'editar'), RolControlador.actualizarRol);
router.delete('/:id', requierePermiso('rol', 'eliminar'), RolControlador.eliminarRol);

module.exports = router;