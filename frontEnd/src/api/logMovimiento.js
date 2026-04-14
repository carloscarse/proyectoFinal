// proyecto/frontEnd/src/api/logMovimiento.js
import api from "./axiosConfig";

export async function registrarMovimiento({
  usuario,
  accion,
  entidad,
  campo,
  previo = null,
  nuevo = null,
  detalle
}) {
  try {
    const res = await api.post("/logmovimiento", {
      usuario,   // 👈 ahora sí lo mandamos
      accion,
      entidad,
      campo,
      previo,
      nuevo,
      detalle
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error en logMovimiento API:", error);
    throw error.response?.data || { error: "Error de conexión con el servidor" };
  }
}