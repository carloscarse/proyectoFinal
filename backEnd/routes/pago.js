const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pago');
const requierePermiso = require('../middleware/permiso');

router.get('/', requierePermiso('pago', 'ver'), PagoController.getAll);
router.get('/:id', requierePermiso('pago', 'ver'), PagoController.getById);
router.post('/', requierePermiso('pago', 'editar'), PagoController.create);
router.put('/:id', requierePermiso('pago', 'editar'), PagoController.update);
router.delete('/:id', requierePermiso('pago', 'eliminar'), PagoController.delete);

module.exports = router;