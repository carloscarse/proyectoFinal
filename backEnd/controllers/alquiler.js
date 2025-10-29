const { conexion } = require('../config/dataBase.js');

// Obtener todos los alquileres
const mostrarAlquileres = (req, res) => {
    conexion.query('SELECT * FROM alquiler', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los alquileres' });
        }
        res.json(results);
    });
};

// Obtener un alquiler por ID
const mostrarAlquiler = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM alquiler WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el alquiler' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Alquiler no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo alquiler
const crearAlquiler = (req, res) => {
    const { contrato, espacio, inicio, fin, estado, nota } = req.body;

    if (!contrato || !espacio || !inicio || !fin || !estado) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: contrato, espacio, inicio, fin y estado'
        });
    }

    const sql = `
        INSERT INTO alquiler 
        (contrato, espacio, inicio, fin, estado, nota) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valores = [contrato, espacio, inicio, fin, estado, nota || null];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el alquiler',
                detalle: error.message
            });
        }
        res.json({ message: 'Alquiler creado correctamente' });
    });
};

// Editar un alquiler existente
const editarAlquiler = (req, res) => {
    const { id } = req.params;
    const { contrato, espacio, inicio, fin, estado, nota } = req.body;

    if (!contrato || !espacio || !inicio || !fin || !estado) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: contrato, espacio, inicio, fin y estado'
        });
    }

    const sql = `
        UPDATE alquiler 
        SET contrato = ?, espacio = ?, inicio = ?, fin = ?, estado = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [contrato, espacio, inicio, fin, estado, nota || null, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el alquiler' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Alquiler no encontrado' });
        }
        res.json({ id, contrato, espacio, estado });
    });
};

// Eliminar un alquiler
const eliminarAlquiler = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM alquiler WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el alquiler' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Alquiler no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarAlquileres,
    mostrarAlquiler,
    crearAlquiler,
    editarAlquiler,
    eliminarAlquiler
};