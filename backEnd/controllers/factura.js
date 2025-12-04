const { conexion } = require('../config/dataBase.js');

// Obtener todas las facturas
const mostrarFacturas = async (req, res) => {
  try {
    const sql = `
      SELECT 
        f.id,
        f.registro,
        f.fecha,
        f.numero,
        f.estado,
        f.nota,
        f.pago_id,
        p.registro AS pago_registro,
        p.fecha AS pago_fecha,
        p.nota AS pago_nota,
        i.id AS inquilino_id,
        per.nombre,
        per.segundoNombre,
        per.apellido,
        per.segundoApellido
      FROM factura f
      LEFT JOIN pago p ON f.pago_id = p.id
      LEFT JOIN inquilino i ON p.inquilino = i.id
      LEFT JOIN persona per ON i.persona = per.id
    `;
    const [results] = await conexion.query(sql);

    const facturas = results.map((r) => ({
      id: r.id,
      registro: r.registro,
      fecha: r.fecha,
      numero: r.numero,
      estado: r.estado,
      nota: r.nota,
      pago: {
        id: r.pago_id,
        registro: r.pago_registro,
        fecha: r.pago_fecha,
        nota: r.pago_nota,
        inquilino: {
          id: r.inquilino_id,
          persona: {
            nombre: r.nombre,
            segundoNombre: r.segundoNombre,
            apellido: r.apellido,
            segundoApellido: r.segundoApellido
          }
        }
      }
    }));

    res.json(facturas);
  } catch (error) {
    console.error('❌ Error SQL en mostrarFacturas:', error.message);
    res.status(500).json({ error: 'Error al obtener las facturas', detalle: error.message });
  }
};

// Obtener una factura por ID
const mostrarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await conexion.query('SELECT * FROM factura WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error SQL en mostrarFactura:', error.message);
    res.status(500).json({ error: 'Error al obtener la factura', detalle: error.message });
  }
};

// Crear una nueva factura
const crearFactura = async (req, res) => {
  try {
    const { fecha, numero, estado, pago_id, nota } = req.body;

    if (!fecha || !numero || !estado || !pago_id) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: fecha, número, estado y pago_id'
      });
    }

    const registro = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
      INSERT INTO factura (registro, fecha, numero, estado, pago_id, nota)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [registro, fecha, numero, estado, pago_id, nota || null];

    const [result] = await conexion.query(sql, valores);

    res.status(201).json({
      success: true,
      message: '✅ Factura creada correctamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('❌ Error SQL en crearFactura:', error.message);
    res.status(500).json({ error: 'Error al crear la factura', detalle: error.message });
  }
};

// Editar una factura existente
const editarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, numero, estado, pago_id, nota } = req.body;

    if (!fecha || !numero || !estado || !pago_id) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: fecha, número, estado y pago_id'
      });
    }

    const registro = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
      UPDATE factura
      SET registro = ?, fecha = ?, numero = ?, estado = ?, pago_id = ?, nota = ?
      WHERE id = ?
    `;
    const valores = [registro, fecha, numero, estado, pago_id, nota || null, id];

    const [result] = await conexion.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.json({ success: true, message: '✅ Factura actualizada correctamente', id: Number(id) });
  } catch (error) {
    console.error('❌ Error SQL en editarFactura:', error.message);
    res.status(500).json({ error: 'Error al editar la factura', detalle: error.message });
  }
};

// Eliminar una factura
const eliminarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await conexion.query('DELETE FROM factura WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.json({ success: true, message: '✅ Factura eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error SQL en eliminarFactura:', error.message);
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