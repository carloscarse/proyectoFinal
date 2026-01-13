// proyecto/backend/src/repositories/servicio.js
const { conexion } = require('../config/dataBase');

// ✅ Consultas directas a la tabla servicio
const ServicioRepository = {
  // Obtener todos los servicios
  async getAll() {
    const [rows] = await conexion.query('SELECT * FROM servicio');
    return rows;
  },

  // Obtener un servicio por ID
  async getById(id) {
    const [rows] = await conexion.query('SELECT * FROM servicio WHERE id = ?', [id]);
    return rows[0];
  },

  // Crear un nuevo servicio
  async create(servicio) {
    const { servicio: nombre, cantidad, precio, factura, nota } = servicio;

    console.log('🧾 Ejecutando INSERT en servicio:', {
      nombre, cantidad, precio, factura, nota
    });

    const query = 'INSERT INTO servicio (servicio, cantidad, precio, factura, nota) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, cantidad, precio, factura, nota];

    const [result] = await conexion.query(query, values);

    console.log('✅ Servicio insertado con ID:', result.insertId);

    return { id: result.insertId, ...servicio };
  },

  // Actualizar un servicio
  async update(id, servicio) {
    const { servicio: nombre, cantidad, precio, factura, nota } = servicio;

    console.log('✏️ Ejecutando UPDATE en servicio:', {
      id, nombre, cantidad, precio, factura, nota
    });

    const query = 'UPDATE servicio SET servicio=?, cantidad=?, precio=?, factura=?, nota=? WHERE id=?';
    const values = [nombre, cantidad, precio, factura, nota, id];

    await conexion.query(query, values);

    return { id, ...servicio };
  },

  // Eliminar un servicio
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en servicio con ID:', id);
    await conexion.query('DELETE FROM servicio WHERE id=?', [id]);
    return { message: `Servicio con id ${id} eliminado` };
  }
};

module.exports = ServicioRepository;