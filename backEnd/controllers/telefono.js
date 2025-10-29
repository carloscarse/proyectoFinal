const { conexion } = require('../config/dataBase.js');

// Obtener todos los teléfonos
const mostrarTelefonos = (req, res) => {
    conexion.query('SELECT * FROM telefono', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los teléfonos' });
        }
        res.json(results);
    });
};

// Obtener un teléfono por ID
const mostrarTelefono = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM telefono WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el teléfono' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Teléfono no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo teléfono
const crearTelefono = (req, res) => {
    const { persona, pais, cArea, numero } = req.body;

    if (!persona || !pais || !cArea || !numero) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: persona, país, código de área y número'
        });
    }

    const sql = `
        INSERT INTO telefono 
        (persona, pais, cArea, numero) 
        VALUES (?, ?, ?, ?)
    `;

    const valores = [persona, pais, cArea, numero];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el teléfono',
                detalle: error.message
            });
        }
        res.json({ message: 'Teléfono creado correctamente' });
    });
};

// Editar un teléfono existente
const editarTelefono = (req, res) => {
    const { id } = req.params;
    const { persona, pais, cArea, numero } = req.body;

    if (!persona || !pais || !cArea || !numero) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: persona, país, código de área y número'
        });
    }

    const sql = `
        UPDATE telefono 
        SET persona = ?, pais = ?, cArea = ?, numero = ?
        WHERE id = ?
    `;

    const valores = [persona, pais, cArea, numero, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el teléfono' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Teléfono no encontrado' });
        }
        res.json({ id, persona, pais, cArea, numero });
    });
};

// Eliminar un teléfono
const eliminarTelefono = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM telefono WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el teléfono' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Teléfono no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarTelefonos,
    mostrarTelefono,
    crearTelefono,
    editarTelefono,
    eliminarTelefono
};