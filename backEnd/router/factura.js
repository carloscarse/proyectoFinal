const express = require('express');
const router = express.Router();

const {
    mostrarFacturas,
    mostrarFactura,
    crearFactura,
    editarFactura,
    eliminarFactura
} = require('../controllers/factura');

// Facturas
router.get("/facturas", mostrarFacturas);
router.get("/factura/:id", mostrarFactura);
router.post("/factura", crearFactura);
router.put("/factura/:id", editarFactura);
router.delete("/factura/:id", eliminarFactura);

// Ruta de prueba
router.get('/facturas-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;