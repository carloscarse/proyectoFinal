const express = require('express');
const router = express.Router();

const {
    mostrarPersonas,
    mostrarPersona,
    crearPersona,
    editarPersona,
    eliminarPersona
} = require('../controllers/persona');

// Personas
router.get("/personas", mostrarPersonas);
router.get("/persona/:id", mostrarPersona);
router.post("/persona", crearPersona);
router.put("/persona/:id", editarPersona);
router.delete("/persona/:id", eliminarPersona);

// Ruta de prueba
router.get('/personas-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;