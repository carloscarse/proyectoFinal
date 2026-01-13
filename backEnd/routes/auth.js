const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');

// 🔑 Endpoint de login
router.post('/login', AuthController.login);

// 🔎 Nuevo endpoint para obtener el label completo del usuario por nombre
// Ejemplo: GET /auth/user/admin
router.get('/user/:usuario', AuthController.getUserByName);

module.exports = router;