const { conexion } = require('../config/dataBase.js');

// Obtener todos los contratos
const mostrarContratos = (req, res) => {
    conexion.query('SELECT * FROM contrato', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los contratos' });
        }
        res.json(results);
    });
};

// Obtener un contrato por ID
const mostrarContrato = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM contrato WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el contrato' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo contrato
const crearContrato = (req, res) => {
    const { registro, fecha, condiciones, inquilino, espacio, inicio, fin, nota } = req.body;

    if (!registro || !fecha || !condiciones || !inquilino || !espacio || !inicio || !fin) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: registro, fecha, condiciones, inquilino, espacio, inicio y fin'
        });
    }

    const sql = `
        INSERT INTO contrato 
        (registro, fecha, condiciones, inquilino, espacio, inicio, fin, nota) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        registro, fecha, condiciones, inquilino, espacio, inicio, fin, nota || null
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el contrato',
                detalle: error.message
            });
        }
        res.json({ message: 'Contrato creado correctamente' });
    });
};

// Editar un contrato existente
const editarContrato = (req, res) => {
    const { id } = req.params;
    const { registro, fecha, condiciones, inquilino, espacio, inicio, fin, nota } = req.body;

    if (!registro || !fecha || !condiciones || !inquilino || !espacio || !inicio || !fin) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: registro, fecha, condiciones, inquilino, espacio, inicio y fin'
        });
    }

    const sql = `
        UPDATE contrato 
        SET registro = ?, fecha = ?, condiciones = ?, inquilino = ?, espacio = ?, inicio = ?, fin = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [
        registro, fecha, condiciones, inquilino, espacio, inicio, fin, nota || null, id
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el contrato' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.json({ id, inquilino, espacio, inicio, fin });
    });
};

// Eliminar un contrato
const eliminarContrato = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM contrato WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el contrato' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarContratos,
    mostrarContrato,
    crearContrato,
    editarContrato,
    eliminarContrato
};