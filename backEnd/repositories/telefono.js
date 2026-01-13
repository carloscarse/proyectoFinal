// proyecto/backend/src/repositories/telefono.js
const { conexion } = require('../config/dataBase');

const TelefonoRepository = {
  // Obtener todos los teléfonos de una persona
  async getAllByPersona(personaId) {
    const [rows] = await conexion.query(
      'SELECT * FROM telefono WHERE persona = ?',
      [personaId]
    );
    return rows;
  },

  // Obtener un teléfono por ID
  async getById(id) {
    const [rows] = await conexion.query(
      'SELECT * FROM telefono WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Crear un nuevo teléfono
  async create(personaId, telefono) {
    const { pais, cArea, numero } = telefono;

    console.log('🧾 Ejecutando INSERT en telefono:', telefono);

    const query = `
      INSERT INTO telefono (persona, pais, cArea, numero)
      VALUES (?, ?, ?, ?)
    `;

    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const values = [
      personaId,
      normalize(pais),
      normalize(cArea),
      normalize(numero)
    ];

    const [result] = await conexion.query(query, values);

    console.log('✅ Teléfono insertado con ID:', result.insertId);

    return { id: result.insertId, persona: personaId, ...telefono };
  },

  // Actualizar un teléfono
  async update(id, telefono) {
    const { pais, cArea, numero } = telefono;

    console.log('✏️ Ejecutando UPDATE en telefono:', { id, ...telefono });

    const query = `
      UPDATE telefono
      SET pais=?, cArea=?, numero=?
      WHERE id=?
    `;

    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const values = [
      normalize(pais),
      normalize(cArea),
      normalize(numero),
      id
    ];

    await conexion.query(query, values);

    return { id, ...telefono };
  },

  // Eliminar un teléfono
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en telefono con ID:', id);
    await conexion.query('DELETE FROM telefono WHERE id=?', [id]);
    return { message: `Teléfono con id ${id} eliminado` };
  }
};

module.exports = TelefonoRepository;