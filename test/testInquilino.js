// proyecto/test/testInquilino.js

const axios = require("axios");

const API_URL = "http://localhost:8000/api/inquilino"; // ajusta si tu backend corre en otro puerto
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3ODM4MjE2MTAsImV4cCI6MTc4Mzg1MDQxMH0.JP5jXqlYvnUoUmrtHcRzHpFhexIhrNmA3njWQ8aSa7g";

async function crearInquilino() {
  console.log("🚀 Iniciando prueba de creación de inquilino...");

  const payload = {
    // 👇 NO enviamos id, la base lo asigna sola
    alta: new Date().toISOString().split("T")[0],
    persona: 1, // usa un id de persona existente en tu base
    borrado: 0
  };

  console.log("📦 Payload preparado:", payload);

  try {
    console.log("🔗 Enviando request POST a:", API_URL);
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    console.log("✅ Request completada con éxito");
    console.log("📄 Status:", response.status);
    console.log("📄 Headers:", response.headers);
    console.log("📄 Datos devueltos:", response.data);
    console.log("🆔 Nuevo inquilino creado con id:", response.data.id);
  } catch (error) {
    console.error("❌ Error al crear inquilino");
    if (error.response) {
      console.error("📄 Status:", error.response.status);
      console.error("📄 Headers:", error.response.headers);
      console.error("📄 Data:", error.response.data);
    } else {
      console.error("📄 Mensaje:", error.message);
    }
    console.error("📄 Stack:", error.stack);
  }
}

crearInquilino();
