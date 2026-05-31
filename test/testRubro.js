// proyecto/test/testRubroBack.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // 👈 ajustá si tu back corre en otro puerto
  withCredentials: true,
});

// 👇 Token que me pasaste
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3NzkwNDMyOTAsImV4cCI6MTc3OTA3MjA5MH0.ZCJXiJCi85sSonnYtTmK4sxcqB6qt8-HYcLS1mHO1W8";

// Configurar header Authorization
api.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

async function testCRUDBack() {
  try {
    console.log("🔎 [BACK] Obteniendo rubros iniciales...");
    const rubrosIniciales = await api.get("/rubro");
    console.log("✅ Rubros iniciales:", rubrosIniciales.data);

    console.log("➕ [BACK] Agregando nuevo rubro...");
    const nuevoRubro = await api.post("/rubro", {
      rubro: "TestRubroBack",
      descripcion: "Rubro de prueba desde back"
    });
    console.log("✅ Nuevo rubro creado:", nuevoRubro.data);

    console.log("🔎 [BACK] Obteniendo rubro por ID...");
    const rubroPorId = await api.get(`/rubro/${nuevoRubro.data.id}`);
    console.log("✅ Rubro obtenido por ID:", rubroPorId.data);

    console.log("✏️ [BACK] Actualizando rubro...");
    const rubroActualizado = await api.put(`/rubro/${nuevoRubro.data.id}`, {
      rubro: "TestRubroBackEditado",
      descripcion: "Descripción editada desde back"
    });
    console.log("✅ Rubro actualizado:", rubroActualizado.data);

    console.log("🗑️ [BACK] Eliminando rubro (borrado lógico)...");
    const rubroEliminado = await api.delete(`/rubro/${nuevoRubro.data.id}`);
    console.log("✅ Rubro eliminado (lógico):", rubroEliminado.data);

    console.log("🔎 [BACK] Obteniendo rubros eliminados...");
    const rubrosEliminados = await api.get("/rubro/eliminados");
    console.log("✅ Rubros eliminados:", rubrosEliminados.data);

    console.log("🗑️ [BACK] Eliminando rubro físicamente...");
    const rubroEliminadoFisico = await api.delete(`/rubro/fisico/${nuevoRubro.data.id}`);
    console.log("✅ Rubro eliminado físicamente:", rubroEliminadoFisico.data);

    console.log("🔎 [BACK] Obteniendo rubros finales...");
    const rubrosFinales = await api.get("/rubro");
    console.log("✅ Rubros finales:", rubrosFinales.data);

  } catch (error) {
    console.error("❌ Error en testCRUDBack:", error.response?.data || error.message);
  }
}

testCRUDBack();