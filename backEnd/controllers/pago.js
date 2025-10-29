const { conexion } = require('../config/dataBase.js');

// Obtener todos los pagos
const mostrarPagos = (req, res) => {
    conexion.query('SELECT * FROM pago', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los pagos' });
        }
        res.json(results);
    });
};

// Obtener un pago por ID
const mostrarPago = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM pago WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el pago' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo pago
const crearPago = (req, res) => {
    const { registro, fecha, usuario, factura, item, inquilino, nota } = req.body;

    if (!registro || !fecha || !usuario || !factura || !item || !inquilino) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: registro, fecha, usuario, factura, item e inquilino'
        });
    }

    const sql = `
        INSERT INTO pago 
        (registro, fecha, usuario, factura, item, inquilino, nota) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [registro, fecha, usuario, factura, item, inquilino, nota || null];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el pago',
                detalle: error.message
            });
        }
        res.json({ message: 'Pago registrado correctamente' });
    });
};

// Editar un pago existente
const editarPago = (req, res) => {
    const { id } = req.params;
    const { registro, fecha, usuario, factura, item, inquilino, nota } = req.body;

    if (!registro || !fecha || !usuario || !factura || !item || !inquilino) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: registro, fecha, usuario, factura, item e inquilino'
        });
    }

    const sql = `
        UPDATE pago 
        SET registro = ?, fecha = ?, usuario = ?, factura = ?, item = ?, inquilino = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [registro, fecha, usuario, factura, item, inquilino, nota || null, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json({ id, usuario, factura, item, inquilino });
    });
};

// Eliminar un pago
const eliminarPago = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM pago WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarPagos,
    mostrarPago,
    crearPago,
    editarPago,
    eliminarPago
};