const { conexion } = require('../config/dataBase.js');

// Obtener todos los espacios
const mostrarEspacios = (req, res) => {
    conexion.query('SELECT * FROM espacio', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los espacios' });
        }
        res.json(results);
    });
};

// Obtener un espacio por ID
const mostrarEspacio = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM espacio WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el espacio' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo espacio
const crearEspacio = (req, res) => {
    const {
        nombre, estado, ancho, largo, tipo, inquilino,
        precio, rubro, recargoUbicaion, descripcion
    } = req.body;

    if (!nombre || !estado || !ancho || !largo || !tipo || !precio || !rubro) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre, estado, dimensiones, tipo, precio y rubro'
        });
    }

    const sql = `
        INSERT INTO espacio 
        (nombre, estado, ancho, largo, tipo, inquilino, precio, rubro, recargoUbicaion, descripcion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        nombre, estado, ancho, largo, tipo, inquilino || null,
        precio, rubro, recargoUbicaion || 0.00, descripcion || null
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el espacio',
                detalle: error.message
            });
        }
        res.json({ message: 'Espacio creado correctamente' });
    });
};

// Editar un espacio existente
const editarEspacio = (req, res) => {
    const { id } = req.params;
    const {
        nombre, estado, ancho, largo, tipo, inquilino,
        precio, rubro, recargoUbicaion, descripcion
    } = req.body;

    if (!nombre || !estado || !ancho || !largo || !tipo || !precio || !rubro) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre, estado, dimensiones, tipo, precio y rubro'
        });
    }

    const sql = `
        UPDATE espacio 
        SET nombre = ?, estado = ?, ancho = ?, largo = ?, tipo = ?, inquilino = ?, precio = ?, rubro = ?, recargoUbicaion = ?, descripcion = ?
        WHERE id = ?
    `;

    const valores = [
        nombre, estado, ancho, largo, tipo, inquilino || null,
        precio, rubro, recargoUbicaion || 0.00, descripcion || null, id
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el espacio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }
        res.json({ id, nombre, estado, tipo, precio });
    });
};

// Eliminar un espacio
const eliminarEspacio = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM espacio WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el espacio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarEspacios,
    mostrarEspacio,
    crearEspacio,
    editarEspacio,
    eliminarEspacio
};