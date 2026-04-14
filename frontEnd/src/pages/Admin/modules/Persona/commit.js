// proyecto/frontEnd/src/pages/Admin/modules/Persona/commit.js

// Persona
import { agregarPersona, actualizarPersona, eliminarPersona } from "../../../../api/persona";

// Direcciones
import { agregarDireccion, actualizarDireccion, eliminarDireccion, obtenerDireccionPorPersona } from "../../../../api/direccion";

// Teléfonos
import { agregarTelefono, actualizarTelefono, eliminarTelefono, obtenerTelefonoPorPersona } from "../../../../api/telefono";

// Logs
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getPersonaLabel } from "../../../../utils/labels/persona";
import { useUserStore } from "../../../../stores/userStore";

/**
 * Crear o actualizar persona
 */
export async function commitPersona(personaForm, persona, onSave) {
  const usuario = useUserStore.getState().user;

  if (!persona?.id) {
    const nueva = await agregarPersona(personaForm);

    // Log de creación de persona
    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "persona",
      campo: Object.keys(personaForm).join(", "),
      previo: null,
      nuevo: Object.values(personaForm).join(", "),
      detalle: `creó la persona ${getPersonaLabel(nueva)} con id ${nueva.id}`
    });

    if (onSave) onSave(nueva);
    return nueva;
  } else {
    await actualizarPersona(persona.id, personaForm);

    // Log de actualización de persona
    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualización",
      entidad: "persona",
      campo: Object.keys(personaForm).join(", "),
      previo: Object.keys(personaForm).map(c => persona[c]).join(", "),
      nuevo: Object.values(personaForm).join(", "),
      detalle: `actualizó la persona ${getPersonaLabel(persona)} con id ${persona.id}`
    });

    if (onSave) onSave();
  }
}

/**
 * Guardar direcciones asociadas a la persona
 */
export async function commitDirecciones(direcciones, personaId, personaObj) {
  const usuario = useUserStore.getState().user;

  for (const dir of direcciones) {
    const nuevaDir = await agregarDireccion({
      ...dir,
      persona: personaId   // ✅ el backend espera "persona"
    });

    // Log de creación de dirección
    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "direccion",
      campo: Object.keys(dir).join(", "),
      previo: null,
      nuevo: Object.values(dir).join(", "),
      detalle: `creó la dirección con id ${nuevaDir.id} asociada a la persona ${getPersonaLabel(personaObj)} con id ${personaId}`
    });
  }
}

/**
 * Guardar teléfonos asociados a la persona
 */
export async function commitTelefonos(telefonos, personaId, personaObj) {
  const usuario = useUserStore.getState().user;

  for (const tel of telefonos) {
    const nuevoTel = await agregarTelefono({
      ...tel,
      persona: personaId   // ✅ igual que direcciones
    });

    // Log de creación de teléfono
    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "telefono",
      campo: Object.keys(tel).join(", "),
      previo: null,
      nuevo: Object.values(tel).join(", "),
      detalle: `creó el teléfono con id ${nuevoTel.id} asociado a la persona ${getPersonaLabel(personaObj)} con id ${personaId}`
    });
  }
}

/**
 * Eliminar persona (y opcionalmente sus relaciones)
 */
export async function commitEliminarPersona(personaId, eliminarRelaciones = false) {
  if (eliminarRelaciones) {
    const direcciones = await obtenerDireccionPorPersona(personaId);
    const telefonos = await obtenerTelefonoPorPersona(personaId);

    for (const dir of direcciones) {
      await eliminarDireccion(dir.id);
    }
    for (const tel of telefonos) {
      await eliminarTelefono(tel.id);
    }
  }

  await eliminarPersona(personaId);

  const usuario = useUserStore.getState().user;

  // Log de eliminación de persona
  registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "persona",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó la persona con id ${personaId}`
  });
}