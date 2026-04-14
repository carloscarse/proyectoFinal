require('dotenv').config({ path: './backEnd/.env' });
const { crearDocumentacion } = require('./backEnd/controllers/documentacion');
const { conexion } = require('./backEnd/config/dataBase'); // ✅ importamos la propiedad conexion

console.log('🟡 Iniciando test de registro de documentación...');

async function runTest() {
  try {
    // Traer un inquilino válido
    const [rows] = await conexion.query('SELECT id FROM inquilino ORDER BY id DESC LIMIT 1');
    if (rows.length === 0) {
      console.log('❌ No hay inquilinos en la base de datos');
      return;
    }

    const inquilinoId = rows[0].id;
    console.log('📋 Usando inquilinoId válido:', inquilinoId);

    const req = {
      body: {
        documento: 'ruta/ficticia/documento.pdf',
        inquilino: inquilinoId, // ✅ id de inquilino válido
        descripcion: 'Test desde consola',
        emision: '2025-11-01',
        vencimiento: '2025-12-01',
        fechaPresentacion: '2025-11-25'
      }
    };

    const res = {
      status: (code) => ({
        json: (data) => {
          console.log(`🔴 Status ${code}:`, data);
        }
      }),
      json: (data) => {
        console.log('🟢 Respuesta OK:', data);
      }
    };

    await crearDocumentacion(req, res);
  } catch (err) {
    console.error('❌ Error en test:', err.message);
  }
}

runTest();