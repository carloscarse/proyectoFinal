// proyecto/backend/src/repositories/pago.js
const { conexion } = require('../config/dataBase');

const PagoRepository = {
  // Obtener todos los pagos
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM pago');
    return rows.map(p => ({
      ...p,
      label: p.numero // ✅ el label del pago es el campo numero
    }));
  },

  // Obtener un pago por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM pago WHERE id = ?', [id]);
    if (!rows[0]) return null;

    const p = rows[0];
    return {
      ...p,
      label: p.numero
    };
  },

  // Crear un nuevo pago
  async create(pago) {
    const { registro, fecha, usuario, inquilino, nota, numero } = pago;

    console.log('🧾 Ejecutando INSERT en pago:', { registro, fecha, usuario, inquilino, nota, numero });

    const query = `
      INSERT INTO pago (registro, fecha, usuario, inquilino, nota, numero)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [registro, fecha, usuario, inquilino, nota, numero];

    const [result] = await conexion.query(query, values);

    console.log('✅ Pago insertado con ID:', result.insertId);

    return { id: result.insertId, ...pago };
  },

  // Actualizar un pago
  async update(id, pago) {
    const { registro, fecha, usuario, inquilino, nota, numero } = pago;

    console.log('✏️ Ejecutando UPDATE en pago:', { id, registro, fecha, usuario, inquilino, nota, numero });

    const query = `
      UPDATE pago
      SET registro=?, fecha=?, usuario=?, inquilino=?, nota=?, numero=?
      WHERE id=?
    `;
    const values = [registro, fecha, usuario, inquilino, nota, numero, id];

    await conexion.query(query, values);

    return { id, ...pago };
  },

  // Eliminar un pago
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en pago con ID:', id);
    await conexion.query('DELETE FROM pago WHERE id=?', [id]);
    return { message: `Pago con id ${id} eliminado` };
  },

  // Obtener sugerencia de número (soft auto increment)
  async getNextNumero() {
    const [rows] = await conexion.query('SELECT COALESCE(MAX(numero), 0) + 1 AS sugerido FROM pago');
    return rows[0].sugerido;
  }
};

module.exports = PagoRepository;