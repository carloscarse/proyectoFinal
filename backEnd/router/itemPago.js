// backEnd/router/itempago.js
const express = require('express');
const router = express.Router();

const {
  mostrarItemsPago,
  mostrarItemPago,
  crearItemPago,
  editarItemPago,
  eliminarItemPago
} = require('../controllers/itemPago');

// Rutas principales de itempago
router.get('/itempagos', mostrarItemsPago);       // ✅ listar todos
router.get('/itempago/:id', mostrarItemPago);     // ✅ obtener uno por id
router.post('/itempago', crearItemPago);          // ✅ crear nuevo
router.put('/itempago/:id', editarItemPago);      // ✅ editar existente
router.delete('/itempago/:id', eliminarItemPago); // ✅ eliminar

// Ruta de prueba opcional
router.get('/itempagos-prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;