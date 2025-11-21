const express = require('express');
const app = express();
require('dotenv').config(); // Carga las variables desde .env
const cors = require('cors');

// Routers
const usuario = require('./router/usuario');
const auth = require('./router/auth');
const persona = require('./router/persona'); // 👈 nuevo

const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Rutas
app.use('/', usuario);
app.use('/auth', auth);
app.use('/persona', persona); // 👈 nuevo

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});