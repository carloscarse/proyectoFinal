// backEnd/router/itempago.js
const express = require('express');
const router = express.Router();

const {
  mostrarItemsPago,
  mostrarItemPago,
  mostrarItemsPorPago, // 👈 nuevo import
  crearItemPago,
  editarItemPago,
  eliminarItemPago
} = require('../controllers/itemPago');

// Rutas principales de itempago
router.get('/', mostrarItemsPago);             // ✅ listar todos
router.get('/:id', mostrarItemPago);           // ✅ obtener uno por id
router.get('/pago/:id', mostrarItemsPorPago);  // ✅ obtener todos los ítems de un pago
router.post('/', crearItemPago);               // ✅ crear nuevo
router.put('/:id', editarItemPago);            // ✅ editar existente
router.delete('/:id', eliminarItemPago);       // ✅ eliminar

// Ruta de prueba opcional
router.get('/itempagos-prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;