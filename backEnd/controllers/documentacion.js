const { conexion } = require('../config/dataBase.js');

// ✅ Obtener todas las documentaciones
const mostrarDocumentaciones = async (req, res) => {
  try {
    const [rows] = await conexion.query('SELECT * FROM documentacion');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener documentaciones', detalle: error.message });
  }
};

// ✅ Obtener una documentación por ID
const mostrarDocumentacion = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conexion.query('SELECT * FROM documentacion WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Documentación no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener documentación', detalle: error.message });
  }
};

// ✅ Crear nueva documentación
const crearDocumentacion = async (req, res) => {
  const { documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion } = req.body;
  if (!documento || !inquilino) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    const sql = `
      INSERT INTO documentacion (documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await conexion.query(sql, [documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion]);
    res.json({ message: 'Documentación creada correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear documentación', detalle: error.message });
  }
};

// ✅ Editar documentación existente
const editarDocumentacion = async (req, res) => {
  const { id } = req.params;
  const { documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion } = req.body;
  try {
    const sql = `
      UPDATE documentacion
      SET documento = ?, inquilino = ?, descripcion = ?, emision = ?, vencimiento = ?, fechaPresentacion = ?
      WHERE id = ?
    `;
    const [result] = await conexion.query(sql, [documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Documentación no encontrada' });
    }
    res.json({ message: 'Documentación actualizada correctamente', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar documentación', detalle: error.message });
  }
};

// ✅ Eliminar documentación
const eliminarDocumentacion = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conexion.query('DELETE FROM documentacion WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Documentación no encontrada' });
    }
    res.json({ message: 'Documentación eliminada correctamente', id });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar documentación', detalle: error.message });
  }
};

module.exports = {
  mostrarDocumentaciones,
  mostrarDocumentacion,
  crearDocumentacion,
  editarDocumentacion,
  eliminarDocumentacion
};