// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/commitEditar.js

import { actualizarInquilino } from "../../../../api/inquilino";
import { agregarDireccion, actualizarDireccion, eliminarDireccion } from "../../../../api/direccion";
import { agregarTelefono, actualizarTelefono, eliminarTelefono } from "../../../../api/telefono";
import { actualizarPersona } from "../../../../api/persona";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { useUserStore } from "../../../../stores/userStore";

export async function commitEditar(formData, inquilinoId, onSave) {
  const usuario = useUserStore.getState().user;

  // Actualizar persona si viene editada
  if (formData.personaEditada) {
    await actualizarPersona(formData.personaEditada.id, formData.personaEditada);
    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualizacion", // 👈 coincide con ENUM
      entidad: "persona",
      campo: Object.keys(formData.personaEditada).join(", "),
      previo: null,
      nuevo: Object.values(formData.personaEditada).join(", "),
      detalle: `actualizó la persona con id ${formData.personaEditada.id}`
    });
  }

  // Convertir fecha alta a YYYY-MM-DD
  const fechaAlta = formData.alta
    ? new Date(formData.alta).toISOString().split("T")[0]
    : null;

  // Actualizar inquilino con persona como ID
  const inquilinoEditado = await actualizarInquilino(inquilinoId, {
    ...formData,
    alta: fechaAlta, // 👈 corregido
    persona: formData.persona?.id || formData.persona
  });

  const inquilinoLabel = getInquilinoLabel(formData);

  // Direcciones (usar las de personaEditada si existen)
  const direcciones = formData.personaEditada?.direcciones || [];
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
        detalle: `eliminó la dirección con id ${dir.id} del inquilino ${inquilinoLabel} con id ${inquilinoId}`
      });
    } else if (dir.nuevo) {
      const nuevaDir = await agregarDireccion({ ...dir, persona: formData.persona?.id || formData.persona });
      registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "direccion",
        campo: Object.keys(dir).join(", "),
        previo: null,
        nuevo: Object.values(dir).join(", "),
        detalle: `agregó la dirección con id ${nuevaDir.id} al inquilino ${inquilinoLabel} con id ${inquilinoId}`
      });
    } else if (dir.editado) {
      await actualizarDireccion(dir.id, dir);
      registrarMovimiento({
        usuario: usuario.id,
        accion: "actualizacion",
        entidad: "direccion",
        campo: Object.keys(dir).join(", "),
        previo: null,
        nuevo: Object.values(dir).join(", "),
        detalle: `actualizó la dirección con id ${dir.id} del inquilino ${inquilinoLabel} con id ${inquilinoId}`
      });
    }
  }

  // Teléfonos (usar los de personaEditada si existen)
  const telefonos = formData.personaEditada?.telefonos || [];
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
        detalle: `eliminó el teléfono con id ${tel.id} del inquilino ${inquilinoLabel} con id ${inquilinoId}`
      });
    } else if (tel.nuevo) {
      const nuevoTel = await agregarTelefono({ ...tel, persona: formData.persona?.id || formData.persona });
      registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "telefono",
        campo: Object.keys(tel).join(", "),
        previo: null,
        nuevo: Object.values(tel).join(", "),
        detalle: `agregó el teléfono con id ${nuevoTel.id} al inquilino ${inquilinoLabel} con id ${inquilinoId}`
      });
    } else if (tel.editado) {
      await actualizarTelefono(tel.id, tel);
      registrarMovimiento({
        usuario: usuario.id,
        accion: "actualizacion",
        entidad: "telefono",
        campo: Object.keys(tel).join(", "),
        previo: null,
        nuevo: Object.values(tel).join(", "),
        detalle: `actualizó el teléfono con id ${tel.id} del inquilino ${inquilinoLabel} con id ${inquilinoId}`
      });
    }
  }

  // Log de edición de inquilino
  registrarMovimiento({
    usuario: usuario.id,
    accion: "actualizacion",
    entidad: "inquilino",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `editó el inquilino ${inquilinoLabel} con id ${inquilinoId}`
  });

  if (onSave) onSave(inquilinoEditado);
  return inquilinoEditado;
}