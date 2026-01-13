// proyecto/backend/src/repositories/alquiler.js
const { conexion } = require('../config/dataBase');

const AlquilerRepository = {
  async getAll() {
    const query = `
      SELECT a.id, a.inquilino, a.espacio, a.fechaInicio, a.fechaFin,
             e.nombre AS espacioNombre
      FROM alquiler a
      LEFT JOIN espacio e ON a.espacio = e.id
    `;
    const [rows] = await conexion.query(query);

    return rows.map(a => ({
      id: a.id,
      inquilino: a.inquilino,
      espacio: a.espacio,
      fechaInicio: a.fechaInicio,
      fechaFin: a.fechaFin,
      label: a.espacioNombre // ✅ el label del alquiler es el nombre del espacio
    }));
  },

  async getById(id) {
    const query = `
      SELECT a.id, a.inquilino, a.espacio, a.fechaInicio, a.fechaFin,
             e.nombre AS espacioNombre
      FROM alquiler a
      LEFT JOIN espacio e ON a.espacio = e.id
      WHERE a.id = ?
    `;
    const [rows] = await conexion.query(query, [id]);
    if (!rows[0]) return null;

    const a = rows[0];
    return {
      id: a.id,
      inquilino: a.inquilino,
      espacio: a.espacio,
      fechaInicio: a.fechaInicio,
      fechaFin: a.fechaFin,
      label: a.espacioNombre
    };
  },

  async create(alquiler) {
    const { inquilino, espacio, fechaInicio, fechaFin } = alquiler;

    console.log('🧾 Ejecutando INSERT en alquiler:', { inquilino, espacio, fechaInicio, fechaFin });

    const query = 'INSERT INTO alquiler (inquilino, espacio, fechaInicio, fechaFin) VALUES (?, ?, ?, ?)';
    const values = [inquilino, espacio, fechaInicio, fechaFin];

    const [result] = await conexion.query(query, values);

    console.log('✅ Alquiler insertado con ID:', result.insertId);

    return { id: result.insertId, ...alquiler };
  },

  async update(id, alquiler) {
    const { inquilino, espacio, fechaInicio, fechaFin } = alquiler;

    console.log('✏️ Ejecutando UPDATE en alquiler:', { id, inquilino, espacio, fechaInicio, fechaFin });

    const query = 'UPDATE alquiler SET inquilino=?, espacio=?, fechaInicio=?, fechaFin=? WHERE id=?';
    const values = [inquilino, espacio, fechaInicio, fechaFin, id];

    await conexion.query(query, values);

    return { id, ...alquiler };
  },

  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en alquiler con ID:', id);
    await conexion.query('DELETE FROM alquiler WHERE id=?', [id]);
    return { message: `Alquiler con id ${id} eliminado` };
  }
};

module.exports = AlquilerRepository;