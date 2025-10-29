const { conexion } = require('../config/dataBase.js');

// Obtener todos los usuarios
const mostrarUsuarios = (req, res) => {
    conexion.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(results);
    });
};

// Obtener un usuario por ID
const mostrarUsuario = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM usuario WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo usuario
const crearUsuario = (req, res) => {
    const { usuario, clave, persona, rol, estado, creacion, ultimoAcceso } = req.body;

    if (!usuario || !clave || !persona || !rol || !estado || !creacion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: usuario, clave, persona, rol, estado y fecha de creación'
        });
    }

    const sql = `
        INSERT INTO usuario 
        (usuario, clave, persona, rol, estado, creacion, ultimoAcceso) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [usuario, clave, persona, rol, estado, creacion, ultimoAcceso || null];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear el usuario',
                detalle: error.message
            });
        }
        res.json({ message: 'Usuario creado correctamente' });
    });
};

// Editar un usuario existente
const editarUsuario = (req, res) => {
    const { id } = req.params;
    const { usuario, clave, persona, rol, estado, creacion, ultimoAcceso } = req.body;

    if (!usuario || !clave || !persona || !rol || !estado || !creacion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: usuario, clave, persona, rol, estado y fecha de creación'
        });
    }

    const sql = `
        UPDATE usuario 
        SET usuario = ?, clave = ?, persona = ?, rol = ?, estado = ?, creacion = ?, ultimoAcceso = ?
        WHERE id = ?
    `;

    const valores = [usuario, clave, persona, rol, estado, creacion, ultimoAcceso || null, id];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ id, usuario, persona, rol, estado });
    });
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM usuario WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(204).send();
    });
};

// Actualizar último acceso (por ejemplo, durante login)
const actualizarUltimoAcceso = (req, res) => {
    const { id } = req.params;
    const fechaActual = new Date();

    conexion.query(
        'UPDATE usuario SET ultimoAcceso = ? WHERE id = ?',
        [fechaActual, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al actualizar el último acceso' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ message: 'Último acceso actualizado', id, ultimoAcceso: fechaActual });
        }
    );
};

module.exports = {
    mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    actualizarUltimoAcceso
};