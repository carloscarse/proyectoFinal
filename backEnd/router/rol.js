const express = require('express');
const router = express.Router();

const {
    mostrarRoles,
    mostrarRol,
    crearRol,
    editarRol,
    eliminarRol
} = require('../controllers/rol');

// Roles
router.get("/roles", mostrarRoles);
router.get("/rol/:id", mostrarRol);
router.post("/rol", crearRol);
router.put("/rol/:id", editarRol);
router.delete("/rol/:id", eliminarRol);

// Ruta de prueba
router.get('/roles-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;