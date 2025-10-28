const express = require('express');
const router = express.Router();


const { mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario} = require('../controllers/usuario');

//Usuarios
router.get("/usuarios", mostrarUsuarios);
router.get("/usuario/:id", mostrarUsuario);
router.post("/usuario", crearUsuario);
router.put("/usuario/:id", editarUsuario);
router.delete("/usuario/:id", eliminarUsuario);
router.get('/usuarios-prueba', (req, res) => {
    // Aquí va la lógica para obtener usuarios
    res.json([]); // Devuelve un array vacío solo para probar
});
module.exports = router;