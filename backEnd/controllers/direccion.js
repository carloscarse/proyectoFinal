const { conexion } = require('../config/dataBase.js');

// Obtener todas las direcciones
const mostrarDirecciones = (req, res) => {
    conexion.query('SELECT * FROM direccion', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las direcciones' });
        }
        res.json(results);
    });
};

// Obtener una dirección por ID
const mostrarDireccion = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM direccion WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la dirección' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Dirección no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva dirección
const crearDireccion = (req, res) => {
    const {
        persona, calle, numero, manzana, lote, edificio,
        piso, departamento, barrio, localidad, ciudad,
        provincia, pais, codigoPostal
    } = req.body;

    if (!persona || !calle || !numero || !localidad || !ciudad || !provincia || !pais || !codigoPostal) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: persona, calle, número, localidad, ciudad, provincia, país y código postal'
        });
    }

    const sql = `
        INSERT INTO direccion 
        (persona, calle, numero, manzana, lote, edificio, piso, departamento, barrio, localidad, ciudad, provincia, pais, codigoPostal) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        persona, calle, numero, manzana || null, lote || null, edificio || null,
        piso || null, departamento || null, barrio || null, localidad, ciudad,
        provincia, pais, codigoPostal
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear la dirección',
                detalle: error.message
            });
        }
        res.json({ message: 'Dirección creada correctamente' });
    });
};

// Editar una dirección existente
const editarDireccion = (req, res) => {
    const { id } = req.params;
    const {
        persona, calle, numero, manzana, lote, edificio,
        piso, departamento, barrio, localidad, ciudad,
        provincia, pais, codigoPostal
    } = req.body;

    if (!persona || !calle || !numero || !localidad || !ciudad || !provincia || !pais || !codigoPostal) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: persona, calle, número, localidad, ciudad, provincia, país y código postal'
        });
    }

    const sql = `
        UPDATE direccion 
        SET persona = ?, calle = ?, numero = ?, manzana = ?, lote = ?, edificio = ?, piso = ?, departamento = ?, barrio = ?, localidad = ?, ciudad = ?, provincia = ?, pais = ?, codigoPostal = ?
        WHERE id = ?
    `;

    const valores = [
        persona, calle, numero, manzana || null, lote || null, edificio || null,
        piso || null, departamento || null, barrio || null, localidad, ciudad,
        provincia, pais, codigoPostal, id
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar la dirección' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Dirección no encontrada' });
        }
        res.json({ id, persona, calle, numero, localidad, ciudad, provincia, pais });
    });
};

// Eliminar una dirección
const eliminarDireccion = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM direccion WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la dirección' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Dirección no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarDirecciones,
    mostrarDireccion,
    crearDireccion,
    editarDireccion,
    eliminarDireccion
};