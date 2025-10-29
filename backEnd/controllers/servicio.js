const { conexion } = require('../config/dataBase.js');

// Obtener todos los servicios
const mostrarServicios = (req, res) => {
    conexion.query('SELECT * FROM servicio', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los servicios' });
        }
        res.json(results);
    });
};

// Obtener un servicio por ID
const mostrarServicio = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM servicio WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el servicio' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo servicio
const crearServicio = (req, res) => {
    const { servicio, cantidad, precio, factura, nota } = req.body;

    if (!servicio || !cantidad || !precio || !factura) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: servicio, cantidad, precio y factura'
        });
    }

    const sql = `
        INSERT INTO servicio 
        (servicio, cantidad, precio, factura, nota) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [servicio, cantidad, precio, factura, nota || null];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el servicio',
                detalle: error.message
            });
        }
        res.json({ message: 'Servicio creado correctamente' });
    });
};

// Editar un servicio existente
const editarServicio = (req, res) => {
    const { id } = req.params;
    const { servicio, cantidad, precio, factura, nota } = req.body;

    if (!servicio || !cantidad || !precio || !factura) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: servicio, cantidad, precio y factura'
        });
    }

    const sql = `
        UPDATE servicio 
        SET servicio = ?, cantidad = ?, precio = ?, factura = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [servicio, cantidad, precio, factura, nota || null, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el servicio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.json({ id, servicio, cantidad, precio, factura });
    });
};

// Eliminar un servicio
const eliminarServicio = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM servicio WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el servicio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarServicios,
    mostrarServicio,
    crearServicio,
    editarServicio,
    eliminarServicio
};