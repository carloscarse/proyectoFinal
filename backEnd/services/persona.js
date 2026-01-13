const PersonaRepository = require('../repositories/persona');
const DireccionRepository = require('../repositories/direccion');
const TelefonoRepository = require('../repositories/telefono');

const PersonaService = {
  async getAll() {
    return await PersonaRepository.getAll();
  },

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    const persona = await PersonaRepository.getById(id);
    if (!persona) throw new Error('Persona no encontrada');
    return persona;
  },

  async create(data) {
    console.log('📥 Datos recibidos en PersonaService.create:', data);

    // Se eliminan validaciones de nombre, apellido y sexo
    const { direcciones, telefonos, ...datosPersona } = data;
    const nuevaPersona = await PersonaRepository.create(datosPersona);
    console.log('✅ Persona creada con ID:', nuevaPersona.id);

    // Guardar direcciones asociadas (permitir incluso si están vacías → se insertan como NULL)
    if (direcciones && Array.isArray(direcciones) && direcciones.length > 0) {
      console.log('📌 Direcciones recibidas:', direcciones);

      for (const dir of direcciones) {
        try {
          console.log('➡️ Insertando dirección:', dir);
          await DireccionRepository.create(nuevaPersona.id, dir);
          console.log('✅ Dirección insertada');
        } catch (err) {
          console.error('❌ Error al insertar dirección:', err.message);
        }
      }
    } else {
      console.log('ℹ️ No se recibieron direcciones para esta persona');
    }

    // Guardar teléfonos asociados (permitir incluso si están vacíos → se insertan como NULL)
    if (telefonos && Array.isArray(telefonos) && telefonos.length > 0) {
      console.log('📌 Teléfonos recibidos:', telefonos);

      for (const tel of telefonos) {
        try {
          console.log('➡️ Insertando teléfono:', tel);
          await TelefonoRepository.create(nuevaPersona.id, tel);
          console.log('✅ Teléfono insertado');
        } catch (err) {
          console.error('❌ Error al insertar teléfono:', err.message);
        }
      }
    } else {
      console.log('ℹ️ No se recibieron teléfonos para esta persona');
    }

    return nuevaPersona;
  },

  async update(id, data) {
    if (!id) throw new Error('ID requerido');
    console.log('✏️ Datos recibidos en PersonaService.update:', id, data);

    // Se elimina validación estricta de sexo
    return await PersonaRepository.update(id, { ...data });
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    try {
      return await PersonaRepository.delete(id);
    } catch (err) {
      console.error('❌ Error en PersonaService.delete:', err.code, err.message);

      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new Error('No se puede eliminar: la persona está vinculada a otros registros (foreign key)');
      }

      throw err;
    }
  }
};

module.exports = PersonaService;