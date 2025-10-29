const { conexion } = require('../config/dataBase.js');

// Obtener todos los archivos
const mostrarArchivos = (req, res) => {
    conexion.query('SELECT * FROM archivo', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los archivos' });
        }
        res.json(results);
    });
};

// Obtener un archivo por ID
const mostrarArchivo = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM archivo WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el archivo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo archivo
const crearArchivo = (req, res) => {
    const { documentacion, archivo, url } = req.body;

    if (!documentacion || !archivo || !url) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: documentacion, nombre de archivo y URL'
        });
    }

    const sql = 'INSERT INTO archivo (documentacion, archivo, url) VALUES (?, ?, ?)';
    const valores = [documentacion, archivo, url];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el archivo',
                detalle: error.message
            });
        }
        res.json({ message: 'Archivo creado correctamente' });
    });
};

// Editar un archivo existente
const editarArchivo = (req, res) => {
    const { id } = req.params;
    const { documentacion, archivo, url } = req.body;

    if (!documentacion || !archivo || !url) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: documentacion, nombre de archivo y URL'
        });
    }

    const sql = 'UPDATE archivo SET documentacion = ?, archivo = ?, url = ? WHERE id = ?';
    const valores = [documentacion, archivo, url, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el archivo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.json({ id, documentacion, archivo, url });
    });
};

// Eliminar un archivo
const eliminarArchivo = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM archivo WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el archivo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarArchivos,
    mostrarArchivo,
    crearArchivo,
    editarArchivo,
    eliminarArchivo
};