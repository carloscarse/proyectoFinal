const express = require('express');
const app = express();
require('dotenv').config(); // Carga las variables desde .env
const cors = require('cors');
const usuario = require("./router/usuario");

// Usamos el puerto desde .env, con fallback a 8000
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use("/",usuario);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});