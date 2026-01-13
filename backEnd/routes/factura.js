const express = require('express');
const router = express.Router();
const FacturaController = require('../controllers/factura');

// GET all
router.get('/', FacturaController.getAll);

// GET by ID
router.get('/:id', FacturaController.getById);

// CREATE
router.post('/', FacturaController.create);

// UPDATE
router.put('/:id', FacturaController.update);

// DELETE
router.delete('/:id', FacturaController.delete);

module.exports = router;