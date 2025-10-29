const { conexion } = require('../config/dataBase.js');

// Obtener todas las facturas
const mostrarFacturas = (req, res) => {
    conexion.query('SELECT * FROM factura', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las facturas' });
        }
        res.json(results);
    });
};

// Obtener una factura por ID
const mostrarFactura = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM factura WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la factura' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva factura
const crearFactura = (req, res) => {
    const { registro, fecha, numero, estado, inquilino, nota } = req.body;

    if (!registro || !fecha || !numero || !estado || !inquilino) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: registro, fecha, número, estado e inquilino'
        });
    }

    const sql = `
        INSERT INTO factura 
        (registro, fecha, numero, estado, inquilino, nota) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valores = [registro, fecha, numero, estado, inquilino, nota || null];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear la factura',
                detalle: error.message
            });
        }
        res.json({ message: 'Factura creada correctamente' });
    });
};

// Editar una factura existente
const editarFactura = (req, res) => {
    const { id } = req.params;
    const { registro, fecha, numero, estado, inquilino, nota } = req.body;

    if (!registro || !fecha || !numero || !estado || !inquilino) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: registro, fecha, número, estado e inquilino'
        });
    }

    const sql = `
        UPDATE factura 
        SET registro = ?, fecha = ?, numero = ?, estado = ?, inquilino = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [registro, fecha, numero, estado, inquilino, nota || null, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar la factura' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.json({ id, numero, estado, inquilino });
    });
};

// Eliminar una factura
const eliminarFactura = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM factura WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la factura' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarFacturas,
    mostrarFactura,
    crearFactura,
    editarFactura,
    eliminarFactura
};