const express = require('express');
const router = express.Router();

const {
    mostrarPagos,
    mostrarPago,
    crearPago,
    editarPago,
    eliminarPago
} = require('../controllers/pago');

// Pagos
router.get("/pagos", mostrarPagos);
router.get("/pago/:id", mostrarPago);
router.post("/pago", crearPago);
router.put("/pago/:id", editarPago);
router.delete("/pago/:id", eliminarPago);

// Ruta de prueba
router.get('/pagos-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;