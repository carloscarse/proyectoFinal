// proyecto/backend/src/repositories/direccion.js
const { conexion } = require('../config/dataBase');

const DireccionRepository = {
  // Obtener todas las direcciones de una persona
  async getAllByPersona(personaId) {
    const [rows] = await conexion.query(
      'SELECT * FROM direccion WHERE persona = ?',
      [personaId]
    );
    return rows;
  },

  // Crear una nueva dirección
  async create(personaId, direccion) {
    const {
      calle,
      numero,
      manzana,
      lote,
      edificio,
      piso,
      departamento,
      barrio,
      localidad,
      ciudad,
      provincia,
      pais,
      codigoPostal
    } = direccion;

    console.log('🧾 Ejecutando INSERT en direccion:', direccion);

    const query = `
      INSERT INTO direccion (
        persona, calle, numero, manzana, lote, edificio, piso, departamento,
        barrio, localidad, ciudad, provincia, pais, codigoPostal
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const normalize = (val) => (val === undefined || val === '' ? null : val);

    const values = [
      personaId,
      normalize(calle),
      normalize(numero),
      normalize(manzana),
      normalize(lote),
      normalize(edificio),
      normalize(piso),
      normalize(departamento),
      normalize(barrio),
      normalize(localidad),
      normalize(ciudad),
      normalize(provincia),
      normalize(pais),
      normalize(codigoPostal)
    ];

    const [result] = await conexion.query(query, values);

    console.log('✅ Dirección insertada con ID:', result.insertId);

    return { id: result.insertId, persona: personaId, ...direccion };
  },

  // Eliminar una dirección
  async delete(id) {
    console.log('🗑️ Ejecutando DELETE en direccion con ID:', id);
    await conexion.query('DELETE FROM direccion WHERE id=?', [id]);
    return { message: `Dirección con id ${id} eliminada` };
  }
};

module.exports = DireccionRepository;