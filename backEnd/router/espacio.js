const express = require('express');
const router = express.Router();

const {
    mostrarEspacios,
    mostrarEspacio,
    crearEspacio,
    editarEspacio,
    eliminarEspacio
} = require('../controllers/espacio');

// Espacios
router.get("/espacios", mostrarEspacios);
router.get("/espacio/:id", mostrarEspacio);
router.post("/espacio", crearEspacio);
router.put("/espacio/:id", editarEspacio);
router.delete("/espacio/:id", eliminarEspacio);

// Ruta de prueba
router.get('/espacios-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;