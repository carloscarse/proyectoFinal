const { conexion } = require('../config/dataBase.js');

// Obtener todas las reservas
const mostrarReservas = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM reserva');
    res.json(results);
  } catch (error) {
    console.error('❌ Error al obtener las reservas:', error.message);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Obtener una reserva por ID
const mostrarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await conexion.query('SELECT * FROM reserva WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error al obtener la reserva:', error.message);
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
};
// Obtener todas las reservas con labels
const mostrarReservasLabel = async (req, res) => {
  try {
    const sql = `
      SELECT r.id, r.fecha, r.tipo, r.diaInicio, r.diaFin, r.actividad,
             r.adelanto, r.estado, r.nota,
             e.nombre AS espacioNombre,
             CONCAT(p.nombre, ' ', p.apellido) AS inquilinoNombre
      FROM reserva r
      JOIN espacio e ON r.espacio = e.id
      JOIN inquilino i ON r.inquilino = i.id
      JOIN persona p ON i.persona = p.id
    `;
    const [results] = await conexion.query(sql);
    res.json(results);
  } catch (error) {
    console.error('❌ Error al obtener reservas con labels:', error.message);
    res.status(500).json({ error: 'Error al obtener reservas con labels' });
  }
};

// Obtener una reserva por ID con labels
const mostrarReservaLabel = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `
      SELECT r.id, r.fecha, r.tipo, r.diaInicio, r.diaFin, r.actividad,
             r.adelanto, r.estado, r.nota,
             e.nombre AS espacioNombre,
             CONCAT(p.nombre, ' ', p.apellido) AS inquilinoNombre
      FROM reserva r
      JOIN espacio e ON r.espacio = e.id
      JOIN inquilino i ON r.inquilino = i.id
      JOIN persona p ON i.persona = p.id
      WHERE r.id = ?
    `;
    const [results] = await conexion.query(sql, [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error al obtener reserva con labels:', error.message);
    res.status(500).json({ error: 'Error al obtener reserva con labels' });
  }
};
// Crear una nueva reserva
const crearReserva = async (req, res) => {
  const {
    fecha, espacio, inquilino, tipo, diaInicio, diaFin,
    actividad, adelanto, estado, nota
  } = req.body;

  if (!fecha || !espacio || !inquilino || !tipo || !diaInicio || !diaFin || !actividad || !estado) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: fecha, espacio, inquilino, tipo, día inicio/fin, actividad y estado'
    });
  }

  try {
    const sql = `
      INSERT INTO reserva 
      (fecha, espacio, inquilino, tipo, diaInicio, diaFin, actividad, adelanto, estado, nota) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      fecha, espacio, inquilino, tipo, diaInicio, diaFin,
      actividad, adelanto || 0.00, estado, nota || null
    ];

    const [result] = await conexion.query(sql, valores);
    res.json({ message: '✅ Reserva creada correctamente', id: result.insertId });
  } catch (error) {
    console.error('❌ Error al crear la reserva:', error.message);
    res.status(500).json({ error: 'Error al crear la reserva', detalle: error.message });
  }
};

// Editar una reserva existente
const editarReserva = async (req, res) => {
  const { id } = req.params;
  const {
    fecha, espacio, inquilino, tipo, diaInicio, diaFin,
    actividad, adelanto, estado, nota
  } = req.body;

  if (!fecha || !espacio || !inquilino || !tipo || !diaInicio || !diaFin || !actividad || !estado) {
    return res.status(400).json({
      error: 'Faltan datos requeridos: fecha, espacio, inquilino, tipo, día inicio/fin, actividad y estado'
    });
  }

  try {
    const sql = `
      UPDATE reserva 
      SET fecha = ?, espacio = ?, inquilino = ?, tipo = ?, diaInicio = ?, diaFin = ?, actividad = ?, adelanto = ?, estado = ?, nota = ?
      WHERE id = ?
    `;
    const valores = [
      fecha, espacio, inquilino, tipo, diaInicio, diaFin,
      actividad, adelanto || 0.00, estado, nota || null, id
    ];

    const [result] = await conexion.query(sql, valores);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: '✅ Reserva actualizada correctamente', id });
  } catch (error) {
    console.error('❌ Error al editar la reserva:', error.message);
    res.status(500).json({ error: 'Error al editar la reserva' });
  }
};

// Eliminar una reserva
const eliminarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await conexion.query('DELETE FROM reserva WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar la reserva:', error.message);
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};

module.exports = {
  mostrarReservas,
  mostrarReserva,
  mostrarReservasLabel,
  mostrarReservaLabel,
  crearReserva,
  editarReserva,
  eliminarReserva
};