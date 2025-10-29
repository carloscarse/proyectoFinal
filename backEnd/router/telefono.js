const express = require('express');
const router = express.Router();

const {
    mostrarTelefonos,
    mostrarTelefono,
    crearTelefono,
    editarTelefono,
    eliminarTelefono
} = require('../controllers/telefono');

// Teléfonos
router.get("/telefonos", mostrarTelefonos);
router.get("/telefono/:id", mostrarTelefono);
router.post("/telefono", crearTelefono);
router.put("/telefono/:id", editarTelefono);
router.delete("/telefono/:id", eliminarTelefono);

// Ruta de prueba
router.get('/telefonos-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;