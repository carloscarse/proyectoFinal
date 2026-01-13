const { conexion } = require('../config/dataBase');

const ReservaRepository = {
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM reserva');
    return rows.map(r => ({ ...r, label: r.espacio }));
  },

  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM reserva WHERE id=?', [id]);
    const r = rows[0];
    return r ? { ...r, label: r.espacio } : null;
  },

  async create(data) {
    const [result] = await conexion.query('INSERT INTO reserva SET ?', [data]);
    return { id: result.insertId, ...data, label: data.espacio };
  },

  async update(id, data) {
    await conexion.query('UPDATE reserva SET ? WHERE id=?', [data, id]);
    return { id, ...data, label: data.espacio };
  },

  async delete(id) {
    await conexion.query('DELETE FROM reserva WHERE id=?', [id]);
    return { mensaje: `Reserva eliminada` };
  }
};

module.exports = ReservaRepository;