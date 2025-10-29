const { conexion } = require('../config/dataBase.js');

// Obtener todas las personas
const mostrarPersonas = (req, res) => {
    conexion.query('SELECT * FROM persona', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las personas' });
        }
        res.json(results);
    });
};

// Obtener una persona por ID
const mostrarPersona = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM persona WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la persona' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva persona
const crearPersona = (req, res) => {
    const { nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email } = req.body;

    if (!nombre || !apellido || !documento || !nacimiento || !sexo || !email) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre, apellido, documento, nacimiento, sexo y email'
        });
    }

    const sql = `
        INSERT INTO persona 
        (nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear la persona',
                detalle: error.message
            });
        }
        res.json({ message: 'Persona creada correctamente' });
    });
};

// Editar una persona existente
const editarPersona = (req, res) => {
    const { id } = req.params;
    const { nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email } = req.body;

    if (!nombre || !apellido || !documento || !nacimiento || !sexo || !email) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre, apellido, documento, nacimiento, sexo y email'
        });
    }

    const sql = `
        UPDATE persona 
        SET nombre = ?, segundoNombre = ?, apellido = ?, segundoApellido = ?, documento = ?, nacimiento = ?, sexo = ?, email = ?
        WHERE id = ?
    `;

    const valores = [nombre, segundoNombre, apellido, segundoApellido, documento, nacimiento, sexo, email, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar la persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.json({ id, nombre, apellido, documento, email });
    });
};

// Eliminar una persona
const eliminarPersona = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM persona WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarPersonas,
    mostrarPersona,
    crearPersona,
    editarPersona,
    eliminarPersona
};