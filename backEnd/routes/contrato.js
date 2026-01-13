const express = require('express');
const router = express.Router();
const ContratoController = require('../controllers/contrato');

// GET all
router.get('/', ContratoController.getAll);

// GET by ID
router.get('/:id', ContratoController.getById);

// CREATE
router.post('/', ContratoController.create);

// UPDATE
router.put('/:id', ContratoController.update);

// DELETE
router.delete('/:id', ContratoController.delete);

module.exports = router;