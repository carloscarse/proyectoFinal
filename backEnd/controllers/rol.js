const { conexion } = require('../config/dataBase.js');

// Obtener todos los roles
const mostrarRoles = (req, res) => {
    conexion.query('SELECT * FROM rol', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los roles' });
        }
        res.json(results);
    });
};

// Obtener un rol por ID
const mostrarRol = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM rol WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el rol' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo rol
const crearRol = (req, res) => {
    const { rol, descripcion, nota } = req.body;

    if (!rol || !descripcion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: rol y descripción'
        });
    }

    const sql = 'INSERT INTO rol (rol, descripcion, nota) VALUES (?, ?, ?)';
    const valores = [rol, descripcion, nota || null];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el rol',
                detalle: error.message
            });
        }
        res.json({ message: 'Rol creado correctamente' });
    });
};

// Editar un rol existente
const editarRol = (req, res) => {
    const { id } = req.params;
    const { rol, descripcion, nota } = req.body;

    if (!rol || !descripcion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: rol y descripción'
        });
    }

    const sql = 'UPDATE rol SET rol = ?, descripcion = ?, nota = ? WHERE id = ?';
    const valores = [rol, descripcion, nota || null, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el rol' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ id, rol, descripcion });
    });
};

// Eliminar un rol
const eliminarRol = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM rol WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el rol' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarRoles,
    mostrarRol,
    crearRol,
    editarRol,
    eliminarRol
};