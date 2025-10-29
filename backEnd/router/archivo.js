const express = require('express');
const router = express.Router();

const {
    mostrarArchivos,
    mostrarArchivo,
    crearArchivo,
    editarArchivo,
    eliminarArchivo
} = require('../controllers/archivo');

// Archivos
router.get("/archivos", mostrarArchivos);
router.get("/archivo/:id", mostrarArchivo);
router.post("/archivo", crearArchivo);
router.put("/archivo/:id", editarArchivo);
router.delete("/archivo/:id", eliminarArchivo);

// Ruta de prueba
router.get('/archivos-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;