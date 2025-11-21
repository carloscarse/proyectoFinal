const express = require('express');
const router = express.Router();

const {
  mostrarUsuarios,
  mostrarUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  actualizarUltimoAcceso,
  loginUsuario // ✅ agregado aquí
} = require('../controllers/usuario');

// Usuarios
router.get("/usuarios", mostrarUsuarios);
router.get("/usuario/:id", mostrarUsuario);
router.post("/usuario", crearUsuario);
router.put("/usuario/:id", editarUsuario);
router.delete("/usuario/:id", eliminarUsuario);

// Actualizar último acceso
router.put("/usuario-acceso/:id", actualizarUltimoAcceso);

// ✅ Ruta de login
router.post("/login", loginUsuario);

// Ruta de prueba
router.get('/usuarios-prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;