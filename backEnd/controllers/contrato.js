const { conexion } = require('../config/dataBase.js');

// Listar todos los contratos
const mostrarContratos = async (req, res) => {
  try {
    const [rows] = await conexion.query('SELECT * FROM contrato');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener contratos:', error);
    res.status(500).json({ error: 'Error al obtener contratos', detalle: error.message });
  }
};

// Obtener un contrato por ID
const mostrarContrato = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await conexion.query('SELECT * FROM contrato WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Contrato no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Error al obtener contrato:', error);
    res.status(500).json({ error: 'Error al obtener contrato', detalle: error.message });
  }
};

// Crear contrato
const crearContrato = async (req, res) => {
  const { fecha, condiciones, inquilino, espacio, inicio, fin, nota } = req.body;

  if (!fecha || !inquilino || !espacio || !inicio || !fin) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: fecha, inquilino, espacio, inicio y fin'
    });
  }

  try {
    const registro = new Date(); // fecha actual del sistema

    const sql = `
      INSERT INTO contrato (registro, fecha, condiciones, inquilino, espacio, inicio, fin, nota)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      registro,
      fecha,
      condiciones || null,
      Number(inquilino),
      Number(espacio),
      inicio,
      fin,
      nota || null
    ];

    const [result] = await conexion.query(sql, valores);
    res.json({ success: true, message: '✅ Contrato creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('❌ Error al crear contrato:', error);
    res.status(500).json({ error: 'Error al crear contrato', detalle: error.message });
  }
};

// Editar contrato
const editarContrato = async (req, res) => {
  const { id } = req.params;
  const { fecha, condiciones, inquilino, espacio, inicio, fin, nota } = req.body;

  if (!fecha || !inquilino || !espacio || !inicio || !fin) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: fecha, inquilino, espacio, inicio y fin'
    });
  }

  try {
    const sql = `
      UPDATE contrato
      SET fecha = ?, condiciones = ?, inquilino = ?, espacio = ?, inicio = ?, fin = ?, nota = ?
      WHERE id = ?
    `;
    const valores = [
      fecha,
      condiciones || null,
      Number(inquilino),
      Number(espacio),
      inicio,
      fin,
      nota || null,
      Number(id)
    ];

    const [result] = await conexion.query(sql, valores);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Contrato no encontrado' });

    res.json({ success: true, message: '✅ Contrato actualizado correctamente', id: Number(id) });
  } catch (error) {
    console.error('❌ Error al editar contrato:', error);
    res.status(500).json({ error: 'Error al editar contrato', detalle: error.message });
  }
};

// Eliminar contrato
const eliminarContrato = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conexion.query('DELETE FROM contrato WHERE id = ?', [Number(id)]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Contrato no encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar contrato:', error);
    res.status(500).json({ error: 'Error al eliminar contrato', detalle: error.message });
  }
};

module.exports = {
  mostrarContratos,
  mostrarContrato,
  crearContrato,
  editarContrato,
  eliminarContrato
};