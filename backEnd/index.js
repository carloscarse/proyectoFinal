const express = require('express');
const app = express();
require('dotenv').config({ path: __dirname + '/.env' }); // ✅ asegura que lea el .env correcto
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { conexion } = require('./config/dataBase');

// Routers
const usuario = require('./router/usuario');
const auth = require('./router/auth');
const persona = require('./router/persona');
const rol = require('./router/rol');
const inquilino = require('./router/inquilino');
const documentacion = require('./router/documentacion');
const espacio = require('./router/espacio');
const rubro = require('./router/rubro');
const alquiler = require('./router/alquiler');
const contrato = require('./router/contrato');
const pago = require('./router/pago');
const itempago = require('./router/itemPago');
const factura = require('./router/factura');
const reserva = require('./router/reserva');    // ✅ nuevo router de reservas

const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// ✅ Inyectar pool en cada request
app.use((req, res, next) => {
  req.db = conexion;
  next();
});

// ✅ Crear carpeta uploads automáticamente y servirla
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📂 Carpeta uploads creada automáticamente');
}
app.use('/uploads', express.static(uploadsDir));

// Rutas principales
app.use('/', usuario);
app.use('/auth', auth);
app.use('/persona', persona);
app.use('/rol', rol);
app.use('/inquilino', inquilino);
app.use('/', documentacion);
app.use('/espacio', espacio);
app.use('/rubro', rubro);
app.use('/alquiler', alquiler);
app.use('/contrato', contrato);
app.use('/pago', pago);
app.use('/itempago', itempago);
app.use('/factura', factura);
app.use('/reserva', reserva);    // ✅ montado

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});