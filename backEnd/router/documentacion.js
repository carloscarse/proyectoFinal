const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // ✅ corregido: carpeta singular

const {
  mostrarDocumentaciones,
  mostrarDocumentacion,
  crearDocumentacion,
  editarDocumentacion,
  eliminarDocumentacion
} = require('../controllers/documentacion');

// Documentación
router.get("/documentaciones", mostrarDocumentaciones);
router.get("/documentacion/:id", mostrarDocumentacion);
router.post("/documentacion", crearDocumentacion);
router.put("/documentacion/:id", editarDocumentacion);
router.delete("/documentacion/:id", eliminarDocumentacion);

// ✅ Subida de archivo con restricción PDF/imagen
router.post('/documentacion/upload', upload.single('archivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo o tipo no permitido' });
  }

  res.json({
    message: '✅ Archivo subido correctamente',
    nombre: req.file.originalname,
    ruta: `/uploads/${req.file.filename}`
  });
});

// Ruta de prueba
router.get('/documentaciones-prueba', (req, res) => {
  res.json([]); // Devuelve un array vacío solo para probar
});

module.exports = router;