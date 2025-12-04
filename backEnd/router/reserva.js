const express = require('express');
const router = express.Router();

const {
  mostrarReservas,
  mostrarReserva,
  mostrarReservasLabel,   // ✅ nuevas funciones importadas
  mostrarReservaLabel,    // ✅ nuevas funciones importadas
  crearReserva,
  editarReserva,
  eliminarReserva
} = require('../controllers/reserva');

// Reservas
router.get('/', mostrarReservas);                 // GET /reserva → lista todas
router.get('/:id', mostrarReserva);               // GET /reserva/:id → una reserva
router.get('/labels', mostrarReservasLabel);      // GET /reserva/labels → todas con labels
router.get('/:id/label', mostrarReservaLabel);    // GET /reserva/:id/label → una con labels
router.post('/', crearReserva);                   // POST /reserva → crear
router.put('/:id', editarReserva);                // PUT /reserva/:id → editar
router.delete('/:id', eliminarReserva);           // DELETE /reserva/:id → eliminar

// Ruta de prueba opcional
router.get('/prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;