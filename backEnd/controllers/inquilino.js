const { conexion } = require('../config/dataBase.js');

// Obtener todos los inquilinos
const mostrarInquilinos = (req, res) => {
    conexion.query('SELECT * FROM inquilino', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los inquilinos' });
        }
        res.json(results);
    });
};

// Obtener un inquilino por ID
const mostrarInquilino = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM inquilino WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el inquilino' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Inquilino no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo inquilino
const crearInquilino = (req, res) => {
    const { persona, alta } = req.body;

    if (!persona || !alta) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: persona y fecha de alta'
        });
    }

    const sql = 'INSERT INTO inquilino (persona, alta) VALUES (?, ?)';
    const valores = [persona, alta];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el inquilino',
                detalle: error.message
            });
        }
        res.json({ message: 'Inquilino creado correctamente' });
    });
};

// Editar un inquilino existente
const editarInquilino = (req, res) => {
    const { id } = req.params;
    const { persona, alta } = req.body;

    if (!persona || !alta) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: persona y fecha de alta'
        });
    }

    const sql = 'UPDATE inquilino SET persona = ?, alta = ? WHERE id = ?';
    const valores = [persona, alta, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el inquilino' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inquilino no encontrado' });
        }
        res.json({ id, persona, alta });
    });
};

// Eliminar un inquilino
const eliminarInquilino = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM inquilino WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el inquilino' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inquilino no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarInquilinos,
    mostrarInquilino,
    crearInquilino,
    editarInquilino,
    eliminarInquilino
};