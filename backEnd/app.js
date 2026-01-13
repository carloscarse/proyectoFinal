const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: __dirname + '/.env' });

const { conexion } = require('./config/dataBase');
const verifyToken = require('./middleware/verifyToken'); // 👈 usar este

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Inyectar pool en cada request
app.use((req, res, next) => {
  req.db = conexion;
  next();
});

// Crear carpeta uploads automáticamente y servirla
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📂 Carpeta uploads creada automáticamente');
}
app.use('/uploads', express.static(uploadsDir));

// Routers
const usuario = require('./routes/usuario');
const auth = require('./routes/auth');
const persona = require('./routes/persona');
const rol = require('./routes/rol');
const inquilino = require('./routes/inquilino');
const direccion = require('./routes/direccion');
const documentacion = require('./routes/documentacion');
const espacio = require('./routes/espacio');
const rubro = require('./routes/rubro');
const alquiler = require('./routes/alquiler');
const contrato = require('./routes/contrato');
const pago = require('./routes/pago');
const permiso = require('./routes/permiso');
const itempago = require('./routes/itemPago');
const factura = require('./routes/factura');
const reserva = require('./routes/reserva');
const servicio = require('./routes/servicio');
const telefono = require('./routes/telefono');


// Montar rutas
app.use('/api/auth', auth); // 👈 pública, no requiere token

// 👇 protegidas con verifyToken
app.use('/api/usuario', verifyToken, usuario);
app.use('/api/persona', verifyToken, persona);
app.use('/api/rol', verifyToken, rol);
app.use('/api/inquilino', verifyToken, inquilino);
app.use('/api/direccion', verifyToken, direccion)
app.use('/api/documentacion', verifyToken, documentacion);
app.use('/api/espacio', verifyToken, espacio);
app.use('/api/rubro', verifyToken, rubro);
app.use('/api/alquiler', verifyToken, alquiler);
app.use('/api/contrato', verifyToken, contrato);
app.use('/api/pago', verifyToken, pago);
app.use('/api/permiso', verifyToken, permiso);
app.use('/api/itempago', verifyToken, itempago);
app.use('/api/factura', verifyToken, factura);
app.use('/api/reserva', verifyToken, reserva);
app.use('/api/servicio', verifyToken, servicio);
app.use('/api/telefono', verifyToken, telefono);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

module.exports = app;