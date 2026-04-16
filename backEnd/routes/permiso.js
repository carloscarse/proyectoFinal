// proyecto/backEnd/routes/permiso.js
const express = require('express');
const router = express.Router();
const PermisoControlador = require('../controllers/permiso');

// 📌 Validar acceso
router.post('/validar', PermisoControlador.validar);

// 📌 CRUD de permisos
router.get('/', PermisoControlador.obtenerPermiso);
router.get('/:id', PermisoControlador.obtenerPermisoPorId);
router.post('/', PermisoControlador.agregarPermiso);
router.put('/:id', PermisoControlador.actualizarPermiso);

// 🔹 Borrado lógico
router.delete('/:id', PermisoControlador.eliminarPermiso);

// 🔹 Borrado físico (solo admins)
router.delete('/fisico/:id', PermisoControlador.eliminarPermisoFisico);

// 📌 Endpoints para permisos eliminados (solo admins)
router.get('/eliminados', PermisoControlador.obtenerPermisosEliminados);
router.get('/eliminados/:id', PermisoControlador.obtenerPermisoEliminadoPorId);

module.exports = router;