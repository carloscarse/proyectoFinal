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
router.get('/', mostrarFacturas);          // GET /factura → lista todas las facturas
router.get('/:id', mostrarFactura);        // GET /factura/:id → obtiene una factura por ID
router.post('/', crearFactura);            // POST /factura → crea una nueva factura
router.put('/:id', editarFactura);         // PUT /factura/:id → edita una factura existente
router.delete('/:id', eliminarFactura);    // DELETE /factura/:id → elimina una factura

// Ruta de prueba
router.get('/prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;