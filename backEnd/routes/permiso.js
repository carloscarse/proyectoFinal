const express = require('express');
const router = express.Router();
const PermisoControlador = require('../controllers/permiso');

// Validar acceso
router.post('/validar', PermisoControlador.validar);

// CRUD de permisos
router.get('/', PermisoControlador.obtenerPermiso);
router.get('/:id', PermisoControlador.obtenerPermisoPorId);
router.post('/', PermisoControlador.agregarPermiso);
router.put('/:id', PermisoControlador.actualizarPermiso);
router.delete('/:id', PermisoControlador.eliminarPermiso);

module.exports = router;