// testFactura.js
// Script independiente para probar el listado y consulta de facturas

const BASE_URL = 'http://localhost:8000'; // 👈 ajustá el puerto si tu backend corre en otro

async function testListarFacturas() {
  try {
    const res = await fetch(`${BASE_URL}/factura/facturas`);
    const data = await res.json();

    if (res.ok) {
      console.log('✅ Facturas obtenidas correctamente:');
      console.log(data);
    } else {
      console.error('❌ Error al obtener facturas:', data);
    }
  } catch (err) {
    console.error('❌ Error en testListarFacturas:', err.message);
  }
}

async function testMostrarFactura(id) {
  try {
    const res = await fetch(`${BASE_URL}/factura/factura/${id}`);
    const data = await res.json();

    if (res.ok) {
      console.log(`✅ Factura con ID ${id} obtenida correctamente:`);
      console.log(data);
    } else {
      console.error(`❌ Error al obtener factura ${id}:`, data);
    }
  } catch (err) {
    console.error('❌ Error en testMostrarFactura:', err.message);
  }
}

async function main() {
  console.log('🔎 Probando listado de facturas...');
  await testListarFacturas();

  console.log('\n🔎 Probando factura por ID...');
  await testMostrarFactura(1); // 👈 ajustá el ID según lo que tengas en tu DB
}

main();