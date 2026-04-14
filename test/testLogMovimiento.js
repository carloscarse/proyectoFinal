// proyecto/test/testLogMovimiento.js
import axios from "axios";

// Cliente Axios directo con tu token
const api = axios.create({
  baseURL: "http://localhost:8000/api", // ⚠️ ajusta al puerto/baseURL de tu backend
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3NzQ4OTgzMDksImV4cCI6MTc3NDkyNzEwOX0.uOgKF1gwV9xWv80nJ_V7CKkR_Gw8IaarcT9T3_02aKw`
  }
});

// Función para registrar movimiento
async function registrarMovimiento({
  usuario,
  accion,
  entidad,
  campo,
  previo = null,
  nuevo = null,
  detalle
}) {
  const res = await api.post("/logmovimiento", {
    usuario,
    accion,
    entidad,
    campo,
    previo,
    nuevo,
    detalle
  });
  return res.data;
}

// Test de prueba
async function testLog() {
  try {
    const resultado = await registrarMovimiento({
      usuario: "carlos.crs@gmail.com",
      accion: "consulta",
      entidad: "persona",
      campo: "id",
      detalle: "Prueba de registrar movimiento desde testLogMovimiento.js"
    });
    console.log("✅ Movimiento registrado correctamente:", resultado);
  } catch (error) {
    console.error("❌ Error al registrar movimiento:", error.response?.data || error);
  }
}

testLog();