// proyecto/testComparacion.js
const { getAllDireccionesByPersona } = require('./frontEnd/src/api/direccion');
const { getAllTelefonosByPersona } = require('./frontEnd/src/api/telefono');

async function testComparacion() {
  try {
    const personaId = 74; // 👈 Cambia el ID según quieras probar
    const token = 'TU_TOKEN_VALIDO_AQUI'; // 👈 Pega aquí el token de tu sesión

    console.log('🔎 Probando API del front con personaId =', personaId);

    // Direcciones
    const direcciones = await getAllDireccionesByPersona(personaId, token);
    console.log('\n🏠 Direcciones recibidas:', direcciones);

    // Teléfonos
    const telefonos = await getAllTelefonosByPersona(personaId, token);
    console.log('\n📞 Teléfonos recibidos:', telefonos);

    // Comparación rápida
    console.log('\n📊 Comparación:');
    console.log(`Direcciones: ${direcciones.length} registros`);
    console.log(`Teléfonos: ${telefonos.length} registros`);
  } catch (err) {
    console.error('❌ Error en testComparacion:', err.message);
  } finally {
    process.exit(0);
  }
}

testComparacion();