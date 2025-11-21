const express = require('express');
const router = express.Router();

const {
  mostrarPersonas,
  mostrarPersona,
  crearPersona,
  editarPersona,
  eliminarPersona
} = require('../controllers/persona');

// Personas
router.get('/', mostrarPersonas);
router.get('/:id', mostrarPersona);
router.post('/', crearPersona);
router.put('/:id', editarPersona);
router.delete('/:id', eliminarPersona);

// Ruta de prueba
router.get('/ping', (req, res) => {
  console.log('🟢 Backend recibió ping desde frontend');
  res.json({ message: 'pong desde /persona/ping' });
});

module.exports = router;