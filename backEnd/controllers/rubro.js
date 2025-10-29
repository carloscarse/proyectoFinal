const { conexion } = require('../config/dataBase.js');

// Obtener todos los rubros
const mostrarRubros = (req, res) => {
    conexion.query('SELECT * FROM rubro', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los rubros' });
        }
        res.json(results);
    });
};

// Obtener un rubro por ID
const mostrarRubro = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM rubro WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el rubro' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Rubro no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo rubro
const crearRubro = (req, res) => {
    const { rubro, descripcion } = req.body;

    if (!rubro || !descripcion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: rubro y descripción'
        });
    }

    const sql = 'INSERT INTO rubro (rubro, descripcion) VALUES (?, ?)';
    const valores = [rubro, descripcion];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el rubro',
                detalle: error.message
            });
        }
        res.json({ message: 'Rubro creado correctamente' });
    });
};

// Editar un rubro existente
const editarRubro = (req, res) => {
    const { id } = req.params;
    const { rubro, descripcion } = req.body;

    if (!rubro || !descripcion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: rubro y descripción'
        });
    }

    const sql = 'UPDATE rubro SET rubro = ?, descripcion = ? WHERE id = ?';
    const valores = [rubro, descripcion, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el rubro' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rubro no encontrado' });
        }
        res.json({ id, rubro, descripcion });
    });
};

// Eliminar un rubro
const eliminarRubro = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM rubro WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el rubro' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rubro no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarRubros,
    mostrarRubro,
    crearRubro,
    editarRubro,
    eliminarRubro
};