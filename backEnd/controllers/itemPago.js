const { conexion } = require('../config/dataBase.js');

// Obtener todos los items de pago
const mostrarItemsPago = async (req, res) => {
  try {
    const [results] = await conexion.query('SELECT * FROM itempago');
    res.json(results);
  } catch (error) {
    console.error('❌ Error SQL en mostrarItemsPago:', error.message);
    res.status(500).json({ error: 'Error al obtener los items de pago', detalle: error.message });
  }
};

// Obtener un item de pago por ID
const mostrarItemPago = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await conexion.query('SELECT * FROM itempago WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Item de pago no encontrado' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('❌ Error SQL en mostrarItemPago:', error.message);
    res.status(500).json({ error: 'Error al obtener el item de pago', detalle: error.message });
  }
};

// Crear un nuevo item de pago
const crearItemPago = async (req, res) => {
  try {
    const { item, descripcion, cantidad, precio, monto, nota, pago } = req.body;

    if (!item || !cantidad || !precio || !monto || !pago) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: item, cantidad, precio, monto y pago'
      });
    }

    const sql = `
      INSERT INTO itempago (item, descripcion, cantidad, precio, monto, nota, pago)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [item, descripcion || null, cantidad, precio, monto, nota || null, pago];

    const [result] = await conexion.query(sql, valores);

    res.json({ success: true, message: '✅ Item de pago registrado correctamente', id: result.insertId });
  } catch (error) {
    console.error('❌ Error SQL en crearItemPago:', error.message);
    res.status(500).json({ error: 'Error al crear el item de pago', detalle: error.message });
  }
};

// Editar un item de pago existente
const editarItemPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, descripcion, cantidad, precio, monto, nota, pago } = req.body;

    if (!item || !cantidad || !precio || !monto || !pago) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: item, cantidad, precio, monto y pago'
      });
    }

    const sql = `
      UPDATE itempago
      SET item = ?, descripcion = ?, cantidad = ?, precio = ?, monto = ?, nota = ?, pago = ?
      WHERE id = ?
    `;
    const valores = [item, descripcion || null, cantidad, precio, monto, nota || null, pago, id];

    const [result] = await conexion.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item de pago no encontrado' });
    }

    res.json({ success: true, message: '✅ Item de pago actualizado correctamente', id: Number(id) });
  } catch (error) {
    console.error('❌ Error SQL en editarItemPago:', error.message);
    res.status(500).json({ error: 'Error al editar el item de pago', detalle: error.message });
  }
};

// Eliminar un item de pago
const eliminarItemPago = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await conexion.query('DELETE FROM itempago WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item de pago no encontrado' });
    }

    res.json({ success: true, message: '✅ Item de pago eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error SQL en eliminarItemPago:', error.message);
    res.status(500).json({ error: 'Error al eliminar el item de pago', detalle: error.message });
  }
};

module.exports = {
  mostrarItemsPago,
  mostrarItemPago,
  crearItemPago,
  editarItemPago,
  eliminarItemPago
};