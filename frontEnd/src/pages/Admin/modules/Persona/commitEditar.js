// proyecto/frontEnd/src/pages/Admin/modules/Persona/commitEditar.js

import { actualizarPersona } from "../../../../api/persona";
import { agregarDireccion, actualizarDireccion, eliminarDireccion } from "../../../../api/direccion";
import { agregarTelefono, actualizarTelefono, eliminarTelefono } from "../../../../api/telefono";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getPersonaLabel } from "../../../../utils/labels/persona";
import { useUserStore } from "../../../../stores/userStore";

export async function commitEditar(formData, personaId, direcciones, telefonos, onSave) {
  const usuario = useUserStore.getState().user;

  // Actualizar persona
  const personaEditada = await actualizarPersona(personaId, formData);

  // ⚠️ Usamos formData para el label, porque siempre tiene los nombres
  const personaLabel = getPersonaLabel(formData);

  // Direcciones
  for (const dir of direcciones) {
    if (dir.eliminado) {
      await eliminarDireccion(dir.id);
      registrarMovimiento({
        usuario: usuario.id,
        accion: "baja",
        entidad: "direccion",
        campo: "Todos",
        previo: null,
        nuevo: null,
        detalle: `eliminó la dirección con id ${dir.id} de la persona ${personaLabel} con id ${personaId}`
      });
    } else if (dir.nuevo) {
      const nuevaDir = await agregarDireccion({ ...dir, persona: personaId });
      registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "direccion",
        campo: Object.keys(dir).join(", "),
        previo: null,
        nuevo: Object.values(dir).join(", "),
        detalle: `agregó la dirección con id ${nuevaDir.id} a la persona ${personaLabel} con id ${personaId}`
      });
    } else if (dir.editado) {
      await actualizarDireccion(dir.id, dir);
      registrarMovimiento({
        usuario: usuario.id,
        accion: "actualización",
        entidad: "direccion",
        campo: Object.keys(dir).join(", "),
        previo: null,
        nuevo: Object.values(dir).join(", "),
        detalle: `actualizó la dirección con id ${dir.id} de la persona ${personaLabel} con id ${personaId}`
      });
    }
  }

  // Teléfonos
  for (const tel of telefonos) {
    if (tel.eliminado) {
      await eliminarTelefono(tel.id);
      registrarMovimiento({
        usuario: usuario.id,
        accion: "baja",
        entidad: "telefono",
        campo: "Todos",
        previo: null,
        nuevo: null,
        detalle: `eliminó el teléfono con id ${tel.id} de la persona ${personaLabel} con id ${personaId}`
      });
    } else if (tel.nuevo) {
      const nuevoTel = await agregarTelefono({ ...tel, persona: personaId });
      registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "telefono",
        campo: Object.keys(tel).join(", "),
        previo: null,
        nuevo: Object.values(tel).join(", "),
        detalle: `agregó el teléfono con id ${nuevoTel.id} a la persona ${personaLabel} con id ${personaId}`
      });
    } else if (tel.editado) {
      await actualizarTelefono(tel.id, tel);
      registrarMovimiento({
        usuario: usuario.id,
        accion: "actualización",
        entidad: "telefono",
        campo: Object.keys(tel).join(", "),
        previo: null,
        nuevo: Object.values(tel).join(", "),
        detalle: `actualizó el teléfono con id ${tel.id} de la persona ${personaLabel} con id ${personaId}`
      });
    }
  }

  // Log de edición de persona
  registrarMovimiento({
    usuario: usuario.id,
    accion: "edicion",
    entidad: "persona",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `editó la persona ${personaLabel} con id ${personaId}`
  });

  if (onSave) onSave(personaEditada);
  return personaEditada;
}