// proyecto/backEnd/routes/documentacion.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const DocumentacionControlador = require('../controllers/documentacion');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// 📌 Endpoints principales - SIN verificarToken
router.get('/', DocumentacionControlador.obtenerDocumentacion);
router.get('/:id', DocumentacionControlador.obtenerDocumentacionPorId);
router.post('/', upload.single('documento'), DocumentacionControlador.agregarDocumentacion);
router.put('/:id', upload.single('documento'), DocumentacionControlador.actualizarDocumentacion);
router.delete('/:id', DocumentacionControlador.eliminarDocumentacion);
router.delete('/fisico/:id', DocumentacionControlador.eliminarDocumentacionFisico);
router.get('/eliminadas', DocumentacionControlador.obtenerDocumentacionesEliminadas);
router.get('/eliminadas/:id', DocumentacionControlador.obtenerDocumentacionEliminadaPorId);

module.exports = router;