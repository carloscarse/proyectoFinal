const express = require('express');
const router = express.Router();

const {
    mostrarDocumentaciones,
    mostrarDocumentacion,
    crearDocumentacion,
    editarDocumentacion,
    eliminarDocumentacion
} = require('../controllers/documentacion');

// Documentación
router.get("/documentaciones", mostrarDocumentaciones);
router.get("/documentacion/:id", mostrarDocumentacion);
router.post("/documentacion", crearDocumentacion);
router.put("/documentacion/:id", editarDocumentacion);
router.delete("/documentacion/:id", eliminarDocumentacion);

// Ruta de prueba
router.get('/documentaciones-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;