const { conexion } = require('../config/dataBase.js');

// Obtener toda la documentación
const mostrarDocumentaciones = (req, res) => {
    conexion.query('SELECT * FROM documentacion', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la documentación' });
        }
        res.json(results);
    });
};

// Obtener una documentación por ID
const mostrarDocumentacion = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM documentacion WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la documentación' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Documentación no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva documentación
const crearDocumentacion = (req, res) => {
    const { documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion } = req.body;

    if (!documento || !inquilino || !emision || !vencimiento) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: documento, inquilino, fecha de emisión y vencimiento'
        });
    }

    const sql = `
        INSERT INTO documentacion 
        (documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        documento, inquilino, descripcion || null,
        emision, vencimiento, fechaPresentacion || null
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear la documentación',
                detalle: error.message
            });
        }
        res.json({ message: 'Documentación creada correctamente' });
    });
};

// Editar una documentación existente
const editarDocumentacion = (req, res) => {
    const { id } = req.params;
    const { documento, inquilino, descripcion, emision, vencimiento, fechaPresentacion } = req.body;

    if (!documento || !inquilino || !emision || !vencimiento) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: documento, inquilino, fecha de emisión y vencimiento'
        });
    }

    const sql = `
        UPDATE documentacion 
        SET documento = ?, inquilino = ?, descripcion = ?, emision = ?, vencimiento = ?, fechaPresentacion = ?
        WHERE id = ?
    `;

    const valores = [
        documento, inquilino, descripcion || null,
        emision, vencimiento, fechaPresentacion || null, id
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar la documentación' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Documentación no encontrada' });
        }
        res.json({ id, documento, inquilino, emision, vencimiento });
    });
};

// Eliminar una documentación
const eliminarDocumentacion = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM documentacion WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la documentación' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Documentación no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarDocumentaciones,
    mostrarDocumentacion,
    crearDocumentacion,
    editarDocumentacion,
    eliminarDocumentacion
};