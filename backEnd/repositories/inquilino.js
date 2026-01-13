// proyecto/backend/src/repositories/inquilino.js
const { conexion } = require('../config/dataBase');

// ✅ Consultas directas a la tabla inquilino
const InquilinoRepository = {
  // Obtener todos los inquilinos con su persona asociada
  async getAll() {
    const query = `
      SELECT i.id, i.persona, i.alta,
             p.nombre, p.segundoNombre, p.apellido, p.segundoApellido
      FROM inquilino i
      LEFT JOIN persona p ON i.persona = p.id
    `;
    const [rows] = await conexion.query(query);

    return rows.map(i => ({
      id: i.id,
      persona: i.persona,
      alta: i.alta,
      label: [i.nombre, i.segundoNombre, i.apellido, i.segundoApellido]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    }));
  },

  // Obtener un inquilino por ID
  async getById(id) {
    const query = `
      SELECT i.id, i.persona, i.alta,
             p.nombre, p.segundoNombre, p.apellido, p.segundoApellido
      FROM inquilino i
      LEFT JOIN persona p ON i.persona = p.id
      WHERE i.id = ?
    `;
    const [rows] = await conexion.query(query, [id]);
    if (!rows[0]) return null;

    const i = rows[0];
    return {
      id: i.id,
      persona: i.persona,
      alta: i.alta,
      label: [i.nombre, i.segundoNombre, i.apellido, i.segundoApellido]
        .filter(v => v && v.trim() !== '')
        .join(' ')
    };
  },

  // Crear un nuevo inquilino
  async create(inquilino) {
    const { persona, alta } = inquilino;

    console.log('🧾 Ejecutando INSERT en inquilino:', { persona, alta });

    const query = 'INSERT INTO inquilino (persona, alta) VALUES (?, ?)';
    const values = [persona, alta];

    const [result] = await conexion.query(query, values);

    console.log('✅ Inquilino insertado con ID:', result.insertId);

    return { id: result.insertId, ...inquilino };
  },

  // Actualizar un inquilino
  async update(id, inquilino) {
    const { persona, alta } = inquilino;

    console.log('✏️ Ejecutando UPDATE en inquilino:', { id, persona, alta });

    const query = 'UPDATE inquilino SET persona=?, alta=? WHERE id=?';
    const values = [persona, alta, id];

    await conexion.query(query, values);

    return { id, ...inquilino };
  },

  // Eliminar un inquilino
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en inquilino con ID:', id);
    await conexion.query('DELETE FROM inquilino WHERE id=?', [id]);
    return { message: `Inquilino con id ${id} eliminado` };
  }
};

module.exports = InquilinoRepository;