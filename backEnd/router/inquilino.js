const express = require('express');
const router = express.Router();
const {
  mostrarInquilinos,
  mostrarInquilino,
  crearInquilino,
  editarInquilino,
  eliminarInquilino
} = require('../controllers/inquilino');

// ✅ Listar todos los inquilinos
router.get('/inquilinos', mostrarInquilinos);

// ✅ Obtener un inquilino por ID
router.get('/:id', mostrarInquilino);

// ✅ Crear un nuevo inquilino
router.post('/', crearInquilino);

// ✅ Editar un inquilino existente
router.put('/:id', editarInquilino);

// ✅ Eliminar un inquilino
router.delete('/:id', eliminarInquilino);

module.exports = router;