const express = require('express');
const router = express.Router();

const {
    mostrarDirecciones,
    mostrarDireccion,
    crearDireccion,
    editarDireccion,
    eliminarDireccion
} = require('../controllers/direccion');

// Direcciones
router.get("/direcciones", mostrarDirecciones);
router.get("/direccion/:id", mostrarDireccion);
router.post("/direccion", crearDireccion);
router.put("/direccion/:id", editarDireccion);
router.delete("/direccion/:id", eliminarDireccion);

// Ruta de prueba
router.get('/direcciones-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;