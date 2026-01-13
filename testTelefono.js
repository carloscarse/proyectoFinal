// proyecto/testTelefonoFront.js
const { getAllTelefonosByPersona } = require('./frontEnd/src/api/telefono');

async function testFront() {
  try {
    const personaId = 76; // 👈 probamos con la persona que ya sabemos tiene teléfono
    const token = 'TU_TOKEN_AQUI'; // 👈 poné un token válido de tu sesión

    console.log('🔎 Probando API del front con personaId =', personaId);

    const telefonos = await getAllTelefonosByPersona(personaId, token);
    console.log('📞 Resultado desde API del front:', telefonos);
  } catch (err) {
    console.error('❌ Error en testTelefonoFront:', err.message);
  } finally {
    process.exit(0);
  }
}

testFront();