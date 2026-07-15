// proyecto/frontEnd/src/pages/Admin/modules/Espacio/commit.js

import { agregarEspacio, actualizarEspacio, eliminarEspacio } from "../../../../api/espacio";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getEspacioLabel } from "../../../../utils/labels/espacio";
import { useUserStore } from "../../../../stores/userStore";
import { commitInquilino } from "../Inquilino/commit";
import { commitRubro } from "../Rubro/commit";

export async function commitEspacio(espacioForm, espacio, onSave) {
  const usuario = useUserStore.getState().user;

  if (!espacio?.id) {
    let payload = {
      ...espacioForm,
      borrado: 0
    };

    // Persistir inquilino si es nuevo
    if (payload.nuevoInquilino?.nuevo) {
      console.log("📦 Commit inquilino desde espacio:", payload.nuevoInquilino);
      const nuevoInquilino = await commitInquilino(
        payload.nuevoInquilino,
        payload.nuevoInquilino.persona,
        payload.nuevoInquilino.persona?.direcciones || [],
        payload.nuevoInquilino.persona?.telefonos || [],
        null,
        (i) => i
      );
      console.log("✅ Inquilino persistido con id:", nuevoInquilino.id);
      payload.inquilino = nuevoInquilino.id;
      delete payload.nuevoInquilino;
    } else if (payload.inquilino) {
      console.log("📦 Usando inquilino existente con id:", payload.inquilino);
    } else {
      console.log("ℹ️ Sin inquilino en payload");
      delete payload.inquilino;
    }

    // Persistir rubro si es nuevo
    if (payload.nuevoRubro?.nuevo) {
      console.log("📦 Commit rubro desde espacio:", payload.nuevoRubro);
      const nuevoRubro = await commitRubro(payload.nuevoRubro, null, (r) => r);
      console.log("✅ Rubro persistido con id:", nuevoRubro.id);
      payload.rubro = nuevoRubro.id;
      delete payload.nuevoRubro;
    } else if (payload.rubro) {
      console.log("📦 Usando rubro existente con id:", payload.rubro);
    } else {
      console.log("ℹ️ Sin rubro en payload");
      delete payload.rubro;
    }

    ["inquilino", "rubro"].forEach((campo) => {
  if (payload[campo] === "" || payload[campo] == null) {
    delete payload[campo]; // Para que quede NULL en DB
  } else {
    payload[campo] = Number(payload[campo]); // "23" -> 23
  }
});

    // Normalizar campos numéricos
    ["ancho", "largo", "precio"].forEach((campo) => {
      if (payload[campo] === "" || payload[campo] == null) {
        console.log(`ℹ️ Campo ${campo} vacío, eliminado`);
        delete payload[campo];
      } else {
        payload[campo] = Number(payload[campo]);
        console.log(`✅ Campo ${campo} normalizado:`, payload[campo]);
      }
    });

    // Normalizar recargoUbicacion como INT
    if (payload.recargoUbicacion === "" || payload.recargoUbicacion == null) {
      console.log("ℹ️ recargoUbicacion vacío, eliminado");
      delete payload.recargoUbicacion;
    } else {
      payload.recargoUbicacion = parseInt(payload.recargoUbicacion, 10);
      console.log("✅ recargoUbicacion normalizado:", payload.recargoUbicacion);
    }

    console.log("📦 Payload final espacio:", payload);
    const nuevoEspacio = await agregarEspacio(payload);
    console.log("✅ Espacio persistido:", nuevoEspacio);

    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "espacio",
      campo: Object.keys(espacioForm).join(", "),
      previo: null,
      nuevo: Object.values(espacioForm).join(", "),
      detalle: `creó el espacio ${getEspacioLabel(nuevoEspacio)} con id ${nuevoEspacio.id}`
    });

    if (onSave) onSave(nuevoEspacio);
    return nuevoEspacio;
  } else {
    console.log("📦 Actualizando espacio existente con id:", espacio.id);
    await actualizarEspacio(espacio.id, {
      ...espacioForm
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualización",
      entidad: "espacio",
      campo: Object.keys(espacioForm).join(", "),
      previo: Object.keys(espacioForm).map(c => espacio[c]).join(", "),
      nuevo: Object.values(espacioForm).join(", "),
      detalle: `actualizó el espacio ${getEspacioLabel(espacio)} con id ${espacio.id}`
    });

    if (onSave) onSave();
  }
}

export async function commitEliminarEspacio(espacioId) {
  console.log("📦 Eliminando espacio con id:", espacioId);
  await eliminarEspacio(espacioId);

  const usuario = useUserStore.getState().user;

  registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "espacio",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó el espacio con id ${espacioId}`
  });
}