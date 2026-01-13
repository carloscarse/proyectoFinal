const express = require('express');
const router = express.Router();
const DocumentacionController = require('../controllers/documentacion');

// GET all
router.get('/', DocumentacionController.getAll);

// GET by ID
router.get('/:id', DocumentacionController.getById);

// CREATE
router.post('/', DocumentacionController.create);

// UPDATE
router.put('/:id', DocumentacionController.update);

// DELETE
router.delete('/:id', DocumentacionController.delete);

module.exports = router;