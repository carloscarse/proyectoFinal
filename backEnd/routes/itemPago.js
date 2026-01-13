const express = require('express');
const router = express.Router();
const ItemPagoController = require('../controllers/itemPago');

// GET all
router.get('/', ItemPagoController.getAll);

// GET by ID
router.get('/:id', ItemPagoController.getById);

// CREATE
router.post('/', ItemPagoController.create);

// UPDATE
router.put('/:id', ItemPagoController.update);

// DELETE
router.delete('/:id', ItemPagoController.delete);

module.exports = router;