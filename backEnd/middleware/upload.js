// proyecto/backEnd/middleware/upload.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // tu conexión
const upload = require('../middleware/upload'); // Tu middleware que ya tenés

// POST - Crear documentación con archivo
router.post('/', upload.single('documento'), async (req, res) => {
  try {
    // req.body trae los campos de texto
    const { descripcion, inquilino, emision, vencimiento, fechaPresentacion } = req.body;
    // req.file trae el archivo subido por multer
    const documento = req.file? req.file.filename : null;

    const [result] = await db.query(
      `INSERT INTO documentacion 
       (documento, descripcion, inquilino, emision, vencimiento, fechaPresentacion, borrado) 
       VALUES (?,?,?,?,?,?,0)`,
      [
        documento, 
        descripcion || null, 
        inquilino || null, 
        emision || null, 
        vencimiento || null, 
        fechaPresentacion || null
      ]
    );
    
    res.json({ 
      id: result.insertId, 
      documento, 
      descripcion, 
      inquilino, 
      emision, 
      vencimiento, 
      fechaPresentacion 
    });
  } catch (error) {
    console.error("❌ Error en agregarDocumentacion:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar documentación con archivo opcional
router.put('/:id', upload.single('documento'), async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, inquilino, emision, vencimiento, fechaPresentacion } = req.body;
    
    // Si subió archivo nuevo, usamos ese. Si no, mantenemos el anterior
    let documento = req.file? req.file.filename : null;
    
    if (!req.file) {
      // No subió archivo nuevo, mantener el actual
      const [rows] = await db.query('SELECT documento FROM documentacion WHERE id =?', [id]);
      documento = rows[0]?.documento;
    }

    await db.query(
      `UPDATE documentacion SET 
       documento =?, descripcion =?, inquilino =?, emision =?, 
       vencimiento =?, fechaPresentacion =? 
       WHERE id =?`,
      [documento, descripcion, inquilino || null, emision || null, vencimiento || null, fechaPresentacion || null, id]
    );
    
    res.json({ id, documento, descripcion, inquilino, emision, vencimiento, fechaPresentacion });
  } catch (error) {
    console.error("❌ Error en actualizarDocumentacion:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;