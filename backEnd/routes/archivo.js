const express = require('express');
const router = express.Router();
const ArchivoController = require('../controllers/archivo');

// GET all
router.get('/', ArchivoController.getAll);

// GET by ID
router.get('/:id', ArchivoController.getById);

// CREATE
router.post('/', ArchivoController.create);

// UPDATE
router.put('/:id', ArchivoController.update);

// DELETE
router.delete('/:id', ArchivoController.delete);

module.exports = router;