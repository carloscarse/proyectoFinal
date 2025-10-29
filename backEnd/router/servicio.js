const express = require('express');
const router = express.Router();

const {
    mostrarServicios,
    mostrarServicio,
    crearServicio,
    editarServicio,
    eliminarServicio
} = require('../controllers/servicio');

// Servicios
router.get("/servicios", mostrarServicios);
router.get("/servicio/:id", mostrarServicio);
router.post("/servicio", crearServicio);
router.put("/servicio/:id", editarServicio);
router.delete("/servicio/:id", eliminarServicio);

// Ruta de prueba
router.get('/servicios-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;