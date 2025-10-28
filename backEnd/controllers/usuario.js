const {conexion} = require('../config/dataBase.js');

const mostrarUsuarios = (req, res) => {
    conexion.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(results);
    });
}

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
}

const crearUsuario = (req, res) => {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: nombre y contraseña'
        });
    }
    conexion.query(
        'INSERT INTO usuario (nombre, email) VALUES (?, ?)', [nombre, email],
        (error, results) => {
            if (error) {
                return res.status(500).json({ 
                    error: 'Error al crear el usuario',
                    detalle: error.message // muestra el error real
                });
            }
            res.json({
                message: "Usuario creado correctamente",
            });
        }
    );
}



const editarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    // Validación de campos requeridos
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Faltan datos requeridos: nombre y email' });
    }

    conexion.query('UPDATE usuario SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ id, nombre, email });
    });
}



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
}

module.exports = {
    mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
};