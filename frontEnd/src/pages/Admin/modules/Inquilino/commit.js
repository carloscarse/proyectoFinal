// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/commit.js

import { agregarInquilino, actualizarInquilino, eliminarInquilino } from "../../../../api/inquilino";
import { commitPersona, commitDirecciones, commitTelefonos } from "../Persona/commit";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { useUserStore } from "../../../../stores/userStore";

/**
 * Crear o actualizar inquilino junto con su persona
 */
export async function commitInquilino(inquilinoForm, personaTemp, direcciones, telefonos, inquilino, onSave) {
  const usuario = useUserStore.getState().user;

  let personaPersistida = personaTemp;

  // 👇 Si la persona es nueva, persistirla primero
  if (personaTemp?.nuevo) {
    personaPersistida = await commitPersona(
      { ...personaTemp, borrado: 0 }, // 👈 aseguramos que siempre arranque en 0
      null,
      (p) => p
    );

    if (direcciones?.length) {
      await commitDirecciones(
        direcciones.map(d => ({ ...d, borrado: 0 })), // 👈 inicializa en 0
        personaPersistida.id,
        personaPersistida
      );
    }
    if (telefonos?.length) {
      await commitTelefonos(
        telefonos.map(t => ({ ...t, borrado: 0 })), // 👈 inicializa en 0
        personaPersistida.id,
        personaPersistida
      );
    }
  }

  // 👇 Crear o actualizar inquilino
  if (!inquilino?.id) {
    const nuevoInquilino = await agregarInquilino({
      ...inquilinoForm,
      persona: personaPersistida.id,
      borrado: 0 // 👈 también inicializamos inquilino en 0
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "inquilino",
      campo: Object.keys(inquilinoForm).join(", "),
      previo: null,
      nuevo: Object.values(inquilinoForm).join(", "),
      detalle: `creó el inquilino ${getInquilinoLabel(nuevoInquilino)} con id ${nuevoInquilino.id}`
    });

    if (onSave) onSave(nuevoInquilino);
    return nuevoInquilino;
  } else {
    await actualizarInquilino(inquilino.id, {
      ...inquilinoForm,
      persona: personaPersistida.id
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualización",
      entidad: "inquilino",
      campo: Object.keys(inquilinoForm).join(", "),
      previo: Object.keys(inquilinoForm).map(c => inquilino[c]).join(", "),
      nuevo: Object.values(inquilinoForm).join(", "),
      detalle: `actualizó el inquilino ${getInquilinoLabel(inquilino)} con id ${inquilino.id}`
    });

    if (onSave) onSave();
  }
}

/**
 * Eliminar inquilino
 */
export async function commitEliminarInquilino(inquilinoId) {
  await eliminarInquilino(inquilinoId);

  const usuario = useUserStore.getState().user;

  registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "inquilino",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó el inquilino con id ${inquilinoId}`
  });
}