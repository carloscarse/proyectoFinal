const express = require('express');
const router = express.Router();

const {
    mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    actualizarUltimoAcceso
} = require('../controllers/usuario');

// Usuarios
router.get("/usuarios", mostrarUsuarios);
router.get("/usuario/:id", mostrarUsuario);
router.post("/usuario", crearUsuario);
router.put("/usuario/:id", editarUsuario);
router.delete("/usuario/:id", eliminarUsuario);

// Actualizar último acceso (por ejemplo, durante login)
router.put("/usuario-acceso/:id", actualizarUltimoAcceso);

// Ruta de prueba
router.get('/usuarios-prueba', (req, res) => {
    res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;