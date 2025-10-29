const express = require('express');
const router = express.Router();

const {
    mostrarAlquileres,
    mostrarAlquiler,
    crearAlquiler,
    editarAlquiler,
    eliminarAlquiler
} = require('../controllers/alquiler');

// Alquileres
router.get("/alquileres", mostrarAlquileres);
router.get("/alquiler/:id", mostrarAlquiler);
router.post("/alquiler", crearAlquiler);
router.put("/alquiler/:id", editarAlquiler);
router.delete("/alquiler/:id", eliminarAlquiler);

// Ruta de prueba
router.get('/alquileres-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;