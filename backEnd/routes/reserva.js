const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reserva');

// GET all
router.get('/', ReservaController.getAll);

// GET by ID
router.get('/:id', ReservaController.getById);

// CREATE
router.post('/', ReservaController.create);

// UPDATE
router.put('/:id', ReservaController.update);

// DELETE
router.delete('/:id', ReservaController.delete);

module.exports = router;