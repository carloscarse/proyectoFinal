// testRegistrarFactura.js
// Script independiente para probar la creación de una factura

const BASE_URL = 'http://localhost:8000'; // 👈 ajustá el puerto si tu backend corre en otro

async function testRegistrarFactura() {
  try {
    const nuevaFactura = {
      fecha: '2025-12-02 12:00:00', // 👈 fecha y hora elegida
      numero: 12345,                // 👈 número cualquiera de factura
      estado: 'emitida',            // 👈 puede ser 'emitida' o 'pagada'
      inquilino: 15,                // 👈 ajustá según un inquilino existente en tu DB
      nota: 'Factura de prueba desde script'
    };

    const res = await fetch(`${BASE_URL}/factura/factura`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaFactura)
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Factura creada correctamente:', data);
    } else {
      console.error('❌ Error al crear factura:', data);
    }
  } catch (err) {
    console.error('❌ Error en el test:', err.message);
  }
}

testRegistrarFactura();