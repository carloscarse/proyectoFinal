const { conexion } = require('../config/dataBase.js');

// Obtener todas las reservas
const mostrarReservas = (req, res) => {
    conexion.query('SELECT * FROM reserva', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las reservas' });
        }
        res.json(results);
    });
};

// Obtener una reserva por ID
const mostrarReserva = (req, res) => {
    const { id } = req.params;

    conexion.query('SELECT * FROM reserva WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la reserva' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva reserva
const crearReserva = (req, res) => {
    const {
        fecha, espacio, inquilino, tipo, diaInicio, diaFin,
        inicio, fin, actividad, adelanto, estado, nota
    } = req.body;

    if (!fecha || !espacio || !inquilino || !tipo || !diaInicio || !diaFin || !inicio || !fin || !actividad || !estado) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: fecha, espacio, inquilino, tipo, día inicio/fin, horario, actividad y estado'
        });
    }

    const sql = `
        INSERT INTO reserva 
        (fecha, espacio, inquilino, tipo, diaInicio, diaFin, inicio, fin, actividad, adelanto, estado, nota) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        fecha, espacio, inquilino, tipo, diaInicio, diaFin,
        inicio, fin, actividad, adelanto || 0.00, estado, nota || null
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Error al crear la reserva',
                detalle: error.message
            });
        }
        res.json({ message: 'Reserva creada correctamente' });
    });
};

// Editar una reserva existente
const editarReserva = (req, res) => {
    const { id } = req.params;
    const {
        fecha, espacio, inquilino, tipo, diaInicio, diaFin,
        inicio, fin, actividad, adelanto, estado, nota
    } = req.body;

    if (!fecha || !espacio || !inquilino || !tipo || !diaInicio || !diaFin || !inicio || !fin || !actividad || !estado) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: fecha, espacio, inquilino, tipo, día inicio/fin, horario, actividad y estado'
        });
    }

    const sql = `
        UPDATE reserva 
        SET fecha = ?, espacio = ?, inquilino = ?, tipo = ?, diaInicio = ?, diaFin = ?, inicio = ?, fin = ?, actividad = ?, adelanto = ?, estado = ?, nota = ?
        WHERE id = ?
    `;

    const valores = [
        fecha, espacio, inquilino, tipo, diaInicio, diaFin,
        inicio, fin, actividad, adelanto || 0.00, estado, nota || null, id
    ];

    conexion.query(sql, valores, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar la reserva' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.json({ id, fecha, tipo, actividad, estado });
    });
};

// Eliminar una reserva
const eliminarReserva = (req, res) => {
    const { id } = req.params;

    conexion.query('DELETE FROM reserva WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la reserva' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(204).send();
    });
};

module.exports = {
    mostrarReservas,
    mostrarReserva,
    crearReserva,
    editarReserva,
    eliminarReserva
};