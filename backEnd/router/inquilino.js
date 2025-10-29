const express = require('express');
const router = express.Router();

const {
    mostrarInquilinos,
    mostrarInquilino,
    crearInquilino,
    editarInquilino,
    eliminarInquilino
} = require('../controllers/inquilino');

// Inquilinos
router.get("/inquilinos", mostrarInquilinos);
router.get("/inquilino/:id", mostrarInquilino);
router.post("/inquilino", crearInquilino);
router.put("/inquilino/:id", editarInquilino);
router.delete("/inquilino/:id", eliminarInquilino);

// Ruta de prueba
router.get('/inquilinos-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;