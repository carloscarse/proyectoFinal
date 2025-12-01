const { conexion } = require('../config/dataBase.js');

// Obtener todos los alquileres
const mostrarAlquileres = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM alquiler');
    res.json(results);
  } catch (error) {
    console.error('❌ Error al obtener los alquileres:', error);
    res.status(500).json({ error: 'Error al obtener los alquileres', detalle: error.message });
  }
};

// Obtener un alquiler por ID
const mostrarAlquiler = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM alquiler WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Alquiler no encontrado' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error al obtener el alquiler:', error);
    res.status(500).json({ error: 'Error al obtener el alquiler', detalle: error.message });
  }
};

// Crear un nuevo alquiler
const crearAlquiler = async (req, res) => {
  const { contrato, espacio, inicio, fin, estado, nota } = req.body;

  if (!contrato || !espacio || !inicio || !fin || !estado) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: contrato, espacio, inicio, fin y estado'
    });
  }

  try {
    const sql = `
      INSERT INTO alquiler 
      (contrato, espacio, inicio, fin, estado, nota) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [contrato, espacio, inicio, fin, estado, nota || null];

    const [result] = await conexion.query(sql, valores);

    res.json({ success: true, message: '✅ Alquiler creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('❌ Error al crear el alquiler:', error);
    res.status(500).json({ error: 'Error al crear el alquiler', detalle: error.message });
  }
};

// Editar un alquiler existente
const editarAlquiler = async (req, res) => {
  const { id } = req.params;
  const { contrato, espacio, inicio, fin, estado, nota } = req.body;

  if (!contrato || !espacio || !inicio || !fin || !estado) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: contrato, espacio, inicio, fin y estado'
    });
  }

  try {
    const sql = `
      UPDATE alquiler 
      SET contrato = ?, espacio = ?, inicio = ?, fin = ?, estado = ?, nota = ?
      WHERE id = ?
    `;
    const valores = [contrato, espacio, inicio, fin, estado, nota || null, id];

    const [result] = await conexion.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Alquiler no encontrado' });
    }

    res.json({ success: true, message: '✅ Alquiler actualizado correctamente', id });
  } catch (error) {
    console.error('❌ Error al editar el alquiler:', error);
    res.status(500).json({ error: 'Error al editar el alquiler', detalle: error.message });
  }
};

// Eliminar un alquiler
const eliminarAlquiler = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conexion.query('DELETE FROM alquiler WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Alquiler no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar el alquiler:', error);
    res.status(500).json({ error: 'Error al eliminar el alquiler', detalle: error.message });
  }
};

module.exports = {
  mostrarAlquileres,
  mostrarAlquiler,
  crearAlquiler,
  editarAlquiler,
  eliminarAlquiler
};