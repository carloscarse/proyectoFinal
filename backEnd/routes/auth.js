// proyecto/backEnd/routes/auth.js

const express = require('express');
const router = express.Router();
const AuthControlador = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');

// 🔑 Endpoint de login (público)
router.post('/login', AuthControlador.login);

// 🔎 Endpoint para obtener datos completos del usuario por nombre (público)
router.get('/user/:usuario', AuthControlador.getUserByName);

// 🔑 Endpoint de logout (público)
router.post('/logout', AuthControlador.logout);

// 🚀 Endpoint protegido: datos del usuario autenticado
router.get('/me', verifyToken, AuthControlador.me);

module.exports = router;