// proyecto/test/testEspacio.js

const axios = require("axios");

const API_URL_PERSONA = "http://localhost:8000/api/persona";
const API_URL_DIRECCION = "http://localhost:8000/api/direccion";
const API_URL_TELEFONO = "http://localhost:8000/api/telefono";
const API_URL_INQUILINO = "http://localhost:8000/api/inquilino";
const API_URL_RUBRO = "http://localhost:8000/api/rubro";
const API_URL_ESPACIO = "http://localhost:8000/api/espacio";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3ODM4OTc1NTMsImV4cCI6MTc4MzkyNjM1M30.lVMVw6v3hDgPbXoFxbM_diPP_iRe5RX8M6GMf2f1Bi8";

async function crearPersona() {
  const payload = {
    nombre: "Carlos",
    segundoNombre: "Prueba",
    apellido: "Tester",
    segundoApellido: "Demo",
    documento: "12345678",
    nacimiento: "1990-01-01",
    sexo: "m",
    email: "carlos.prueba@example.com",
    borrado: 0
  };
  console.log("📦 Payload persona:", payload);
  const response = await axios.post(API_URL_PERSONA, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log("✅ Persona creada:", response.data);
  return response.data.id;
}

async function crearDireccion(personaId) {
  const payload = {
    persona: personaId,
    calle: "Av. Siempre Viva",
    numero: 742,
    ciudad: "Springfield",
    provincia: "Tucumán",
    pais: "Argentina",
    codigoPostal: "4000",
    borrado: 0
  };
  console.log("📦 Payload dirección:", payload);
  const response = await axios.post(API_URL_DIRECCION, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log("✅ Dirección creada:", response.data);
  return response.data.id;
}

async function crearTelefono(personaId) {
  const payload = {
    persona: personaId,
    pais: 54,
    cArea: 381,
    numero: 1234567,
    borrado: 0
  };
  console.log("📦 Payload teléfono:", payload);
  const response = await axios.post(API_URL_TELEFONO, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log("✅ Teléfono creado:", response.data);
  return response.data.id;
}

async function crearInquilino(personaId) {
  const payload = {
    persona: personaId,
    alta: new Date().toISOString().split("T")[0],
    borrado: 0
  };
  console.log("📦 Payload inquilino:", payload);
  const response = await axios.post(API_URL_INQUILINO, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log("✅ Inquilino creado:", response.data);
  return response.data.id;
}

async function crearRubro() {
  const payload = {
    rubro: "Comercio de prueba",
    descripcion: "Rubro generado en test",
    borrado: 0
  };
  console.log("📦 Payload rubro:", payload);
  const response = await axios.post(API_URL_RUBRO, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log("✅ Rubro creado:", response.data);
  return response.data.id;
}

async function crearEspacio(inquilinoId, rubroId) {
  const payload = {
    nombre: "Local de prueba completo",
    estado: "libre",
    ancho: 15,
    largo: 30,
    tipo: "Mediano",
    inquilino: inquilinoId,
    precio: 1000,
    rubro: rubroId,
    recargoUbicacion: 10,
    descripcion: "Espacio generado con todos los datos",
    borrado: 0
  };
  console.log("📦 Payload espacio:", payload);
  const response = await axios.post(API_URL_ESPACIO, payload, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log("✅ Espacio creado:", response.data);
}

async function main() {
  try {
    const personaId = await crearPersona();
    await crearDireccion(personaId);
    await crearTelefono(personaId);
    const inquilinoId = await crearInquilino(personaId);
    const rubroId = await crearRubro();
    await crearEspacio(inquilinoId, rubroId);
  } catch (error) {
    console.error("❌ Error en test:", error.response?.data || error.message);
  }
}

main();