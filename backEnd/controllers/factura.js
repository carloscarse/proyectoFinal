const { conexion } = require('../config/dataBase.js');

// Obtener todas las facturas
const mostrarFacturas = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM factura');
    res.json(results);
  } catch (error) {
    console.error('❌ Error al obtener las facturas:', error);
    res.status(500).json({ error: 'Error al obtener las facturas', detalle: error.message });
  }
};

// Obtener una factura por ID
const mostrarFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM factura WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error al obtener la factura:', error);
    res.status(500).json({ error: 'Error al obtener la factura', detalle: error.message });
  }
};

// Crear una nueva factura
const crearFactura = async (req, res) => {
  let { fecha, numero, estado, inquilino, nota } = req.body;

  // Validaciones mínimas
  if (!fecha || !numero || !estado || !inquilino) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: fecha, número, estado e inquilino'
    });
  }

  // registro oculto → se completa con fecha/hora actual del sistema
  const registro = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    INSERT INTO factura 
    (registro, fecha, numero, estado, inquilino, nota) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valores = [registro, fecha, numero, estado, inquilino, nota || null];

  try {
    const [results] = await conexion.query(sql, valores);
    res.status(201).json({ id: results.insertId, message: 'Factura creada correctamente' });
  } catch (error) {
    console.error('❌ Error al crear la factura:', error);
    res.status(500).json({ error: 'Error al crear la factura', detalle: error.message });
  }
};

// Editar una factura existente
const editarFactura = async (req, res) => {
  const { id } = req.params;
  const { fecha, numero, estado, inquilino, nota } = req.body;

  if (!fecha || !numero || !estado || !inquilino) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: fecha, número, estado e inquilino'
    });
  }

  // registro se actualiza automáticamente al editar
  const registro = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    UPDATE factura 
    SET registro = ?, fecha = ?, numero = ?, estado = ?, inquilino = ?, nota = ?
    WHERE id = ?
  `;
  const valores = [registro, fecha, numero, estado, inquilino, nota || null, id];

  try {
    const [results] = await conexion.query(sql, valores);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.json({ id, numero, estado, inquilino });
  } catch (error) {
    console.error('❌ Error al editar la factura:', error);
    res.status(500).json({ error: 'Error al editar la factura', detalle: error.message });
  }
};

// Eliminar una factura
const eliminarFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('DELETE FROM factura WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar la factura:', error);
    res.status(500).json({ error: 'Error al eliminar la factura', detalle: error.message });
  }
};

module.exports = {
  mostrarFacturas,
  mostrarFactura,
  crearFactura,
  editarFactura,
  eliminarFactura
};