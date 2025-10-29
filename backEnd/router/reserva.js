const express = require('express');
const router = express.Router();

const {
    mostrarReservas,
    mostrarReserva,
    crearReserva,
    editarReserva,
    eliminarReserva
} = require('../controllers/reserva');

// Reservas
router.get("/reservas", mostrarReservas);
router.get("/reserva/:id", mostrarReserva);
router.post("/reserva", crearReserva);
router.put("/reserva/:id", editarReserva);
router.delete("/reserva/:id", eliminarReserva);

// Ruta de prueba
router.get('/reservas-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;