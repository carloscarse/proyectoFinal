const express = require('express');
const router = express.Router();

// 🧩 Controladores de rol (async/await)
const {
  crearRol,
  mostrarRoles,
  mostrarRol,
  editarRol,
  eliminarRol
} = require('../controllers/rol');

// 🟡 Obtener todos los roles
router.get('/', mostrarRoles); // GET /rol

// 🟡 Obtener un rol por ID
router.get('/:id', mostrarRol); // GET /rol/:id

// 🟢 Crear un nuevo rol
router.post('/', crearRol); // POST /rol

// 🟠 Editar un rol por ID
router.put('/:id', editarRol); // PUT /rol/:id

// 🔴 Eliminar un rol por ID
router.delete('/:id', eliminarRol); // DELETE /rol/:id

module.exports = router;