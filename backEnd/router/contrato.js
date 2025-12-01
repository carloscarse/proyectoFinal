const express = require('express');
const router = express.Router();

const {
  mostrarContratos,
  mostrarContrato,
  crearContrato,
  editarContrato,
  eliminarContrato
} = require('../controllers/contrato');

// Contratos
router.get('/contratos', mostrarContratos);       // listar todos
router.get('/contrato/:id', mostrarContrato);     // obtener uno por id
router.post('/contrato', crearContrato);          // crear nuevo
router.put('/contrato/:id', editarContrato);      // editar existente
router.delete('/contrato/:id', eliminarContrato); // eliminar

// Ruta de prueba
router.get('/contratos-prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;