const { conexion } = require('../config/dataBase');

const ItemPagoRepository = {
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM itemPago');
    return rows.map(r => ({ ...r, label: r.item }));
  },

  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM itemPago WHERE id=?', [id]);
    const r = rows[0];
    return r ? { ...r, label: r.item } : null;
  },

  async create(data) {
    const [result] = await conexion.query('INSERT INTO itemPago SET ?', [data]);
    return { id: result.insertId, ...data, label: data.item };
  },

  async update(id, data) {
    await conexion.query('UPDATE itemPago SET ? WHERE id=?', [data, id]);
    return { id, ...data, label: data.item };
  },

  async delete(id) {
    await conexion.query('DELETE FROM itemPago WHERE id=?', [id]);
    return { mensaje: `Item de pago eliminado` };
  }
};

module.exports = ItemPagoRepository;