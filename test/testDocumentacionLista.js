// testDocumentacionLista.js
const { conexion } = require('./backEnd/config/dataBase.js');

async function testDocumentacionLista() {
  try {
    const [rows] = await conexion.query('SELECT * FROM documentacion');
    console.log('✅ Documentaciones encontradas:');
    if (rows.length === 0) {
      console.log('No hay documentación registrada en la base de datos.');
    } else {
      rows.forEach(doc => {
        console.log(
          `ID: ${doc.id} | Documento: ${doc.documento} | Inquilino: ${doc.inquilino} | Emisión: ${doc.emision} | Vencimiento: ${doc.vencimiento} | Presentación: ${doc.fechaPresentacion}`
        );
      });
    }
  } catch (error) {
    console.error('❌ Error al consultar la documentación:', error.message);
  } finally {
    await conexion.end(); // cerrar pool correctamente
  }
}

testDocumentacionLista();