const { conexion } = require('../config/dataBase.js');

// Obtener todos los pagos con datos relacionados
const mostrarPagos = async (req, res) => {
  try {
    const sql = `
      SELECT 
        p.id,
        p.fecha,
        p.registro,
        p.nota,
        u.id AS usuario_id,
        u.usuario AS usuario_nombre,
        i.id AS inquilino_id,
        per.nombre,
        per.segundoNombre,
        per.apellido,
        per.segundoApellido
      FROM pago p
      LEFT JOIN usuario u ON p.usuario = u.id
      LEFT JOIN inquilino i ON p.inquilino = i.id
      LEFT JOIN persona per ON i.persona = per.id
    `;

    const [results] = await conexion.query(sql);

    const pagos = results.map((r) => ({
      id: r.id,
      fecha: r.fecha,
      registro: r.registro,
      nota: r.nota,
      usuario: { id: r.usuario_id, usuario: r.usuario_nombre },
      inquilino: {
        id: r.inquilino_id,
        persona: {
          nombre: r.nombre,
          segundoNombre: r.segundoNombre,
          apellido: r.apellido,
          segundoApellido: r.segundoApellido
        }
      }
    }));

    res.json(pagos);
  } catch (error) {
    console.error('❌ Error SQL en mostrarPagos:', error.message);
    res.status(500).json({ error: 'Error al obtener los pagos', detalle: error.message });
  }
};

// Obtener un pago por ID
const mostrarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await conexion.query('SELECT * FROM pago WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error SQL en mostrarPago:', error.message);
    res.status(500).json({ error: 'Error al obtener el pago', detalle: error.message });
  }
};

// Crear un nuevo pago
const crearPago = async (req, res) => {
  try {
    const { registro, fecha, usuario, inquilino, nota } = req.body;

    if (!registro || !fecha || !usuario || !inquilino) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: registro, fecha, usuario e inquilino'
      });
    }

    const sql = `
      INSERT INTO pago (registro, fecha, usuario, inquilino, nota)
      VALUES (?, ?, ?, ?, ?)
    `;
    const valores = [registro, fecha, usuario, inquilino, nota || null];

    const [result] = await conexion.query(sql, valores);

    res.json({ success: true, message: '✅ Pago registrado correctamente', id: result.insertId });
  } catch (error) {
    console.error('❌ Error SQL en crearPago:', error.message);
    res.status(500).json({ error: 'Error al crear el pago', detalle: error.message });
  }
};

// Editar un pago existente
const editarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { registro, fecha, usuario, inquilino, nota } = req.body;

    if (!registro || !fecha || !usuario || !inquilino) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: registro, fecha, usuario e inquilino'
      });
    }

    const sql = `
      UPDATE pago
      SET registro = ?, fecha = ?, usuario = ?, inquilino = ?, nota = ?
      WHERE id = ?
    `;
    const valores = [registro, fecha, usuario, inquilino, nota || null, id];

    const [result] = await conexion.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    res.json({ success: true, message: '✅ Pago actualizado correctamente', id: Number(id) });
  } catch (error) {
    console.error('❌ Error SQL en editarPago:', error.message);
    res.status(500).json({ error: 'Error al editar el pago', detalle: error.message });
  }
};

// Eliminar un pago
const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await conexion.query('DELETE FROM pago WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    res.json({ success: true, message: '✅ Pago eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error SQL en eliminarPago:', error.message);
    res.status(500).json({ error: 'Error al eliminar el pago', detalle: error.message });
  }
};

module.exports = {
  mostrarPagos,
  mostrarPago,
  crearPago,
  editarPago,
  eliminarPago
};