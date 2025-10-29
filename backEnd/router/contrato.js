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
router.get("/contratos", mostrarContratos);
router.get("/contrato/:id", mostrarContrato);
router.post("/contrato", crearContrato);
router.put("/contrato/:id", editarContrato);
router.delete("/contrato/:id", eliminarContrato);

// Ruta de prueba
router.get('/contratos-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;