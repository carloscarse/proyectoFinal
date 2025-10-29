const express = require('express');
const router = express.Router();

const {
    mostrarRubros,
    mostrarRubro,
    crearRubro,
    editarRubro,
    eliminarRubro
} = require('../controllers/rubro');

// Rubros
router.get("/rubros", mostrarRubros);
router.get("/rubro/:id", mostrarRubro);
router.post("/rubro", crearRubro);
router.put("/rubro/:id", editarRubro);
router.delete("/rubro/:id", eliminarRubro);

// Ruta de prueba
router.get('/rubros-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;