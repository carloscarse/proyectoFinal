const express = require('express');
const router = express.Router();
const PermisoController = require('../controllers/permiso');

// Este endpoint permite consultar permisos directamente
router.post('/validar', PermisoController.validar);

module.exports = router;