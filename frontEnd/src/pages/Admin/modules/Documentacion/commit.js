// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/commit.js

import { agregarDocumentacion, actualizarDocumentacion, eliminarDocumentacion } from "../../../../api/documentacion";
import { agregarInquilino } from "../../../../api/inquilino";
import { agregarPersona } from "../../../../api/persona";
import { agregarTelefono } from "../../../../api/telefono";
import { agregarDireccion } from "../../../../api/direccion";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getDocumentacionLabel } from "../../../../utils/labels/documentacion";
import { useUserStore } from "../../../../stores/userStore";

/**
 * Crear documentación con cascada completa
 */
export async function commitDocumentacion(documentacionForm) {
  const usuario = useUserStore.getState().user;
  
  const payload = {...documentacionForm };
  let inquilinoId = payload.inquilino;

  // Si hay inquilino nuevo, lo creamos en cascada
  if (payload.inquilino === "nuevo_temp" && payload.nuevoInquilino) {
    console.log("📦 Creando inquilino nuevo en cascada:", payload.nuevoInquilino);
    
    let personaId = payload.nuevoInquilino.persona;
    
    // 1. Si persona es objeto con nuevo: true, la creamos primero
    if (typeof personaId === 'object' && personaId?.nuevo === true) {
      console.log("👤 Creando persona nueva:", personaId);
      
      // 1.1 Crear direcciones de la persona
      let direccionIds = [];
      if (personaId.direcciones && Array.isArray(personaId.direcciones)) {
        for (const dir of personaId.direcciones) {
          if (dir.nuevo === true) {
            const nuevaDir = await agregarDireccion({
          ...dir,
              persona: null // Se setea después
            });
            direccionIds.push(nuevaDir.id);
            console.log("📍 Dirección creada:", nuevaDir.id);
          } else {
            direccionIds.push(dir.id);
          }
        }
      }
      
      // 1.2 Crear teléfonos de la persona
      let telefonoIds = [];
      if (personaId.telefonos && Array.isArray(personaId.telefonos)) {
        for (const tel of personaId.telefonos) {
          if (tel.nuevo === true) {
            const nuevoTel = await agregarTelefono({
          ...tel,
              persona: null // Se setea después
            });
            telefonoIds.push(nuevoTel.id);
            console.log("📞 Teléfono creado:", nuevoTel.id);
          } else {
            telefonoIds.push(tel.id);
          }
        }
      }
      
      // 1.3 Crear la persona con los IDs de direcciones y teléfonos
      const personaParaCrear = {
        nombre: personaId.nombre,
        apellido: personaId.apellido,
        dni: personaId.dni,
        cuit: personaId.cuit,
        email: personaId.email,
        fechaNacimiento: personaId.fechaNacimiento,
        direcciones: direccionIds,
        telefonos: telefonoIds
      };
      
      const nuevaPersona = await agregarPersona(personaParaCrear);
      personaId = nuevaPersona.id;
      
      await registrarMovimiento({
        usuario: usuario.id,
        accion: "alta",
        entidad: "persona",
        campo: Object.keys(personaParaCrear).join(", "),
        previo: null,
        nuevo: Object.values(personaParaCrear).join(", "),
        detalle: `creó la persona con id ${nuevaPersona.id} desde Documentación`
      });
      
      console.log("✅ Persona creada con ID:", personaId);
    } else if (typeof personaId === 'object') {
      // Si es objeto pero ya existe, sacar el id
      personaId = personaId.id;
    }
    
    // 2. Crear el inquilino con el id de persona
    const inquilinoParaCrear = {
  ...payload.nuevoInquilino,
      persona: personaId // Ya es un int
    };
    
    const nuevoInq = await agregarInquilino(inquilinoParaCrear);
    inquilinoId = nuevoInq.id;
    
    await registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "inquilino",
      campo: Object.keys(inquilinoParaCrear).join(", "),
      previo: null,
      nuevo: Object.values(inquilinoParaCrear).join(", "),
      detalle: `creó el inquilino con id ${nuevoInq.id} desde Documentación`
    });

    console.log("✅ Inquilino creado con ID:", inquilinoId);
  }

  // 3. Armamos FormData para la documentación
  const formDataToSend = new FormData();
  if (payload.documento) formDataToSend.append("documento", payload.documento);
  formDataToSend.append("descripcion", payload.descripcion || "");
  formDataToSend.append("inquilino", inquilinoId || "");
  formDataToSend.append("emision", payload.emision || "");
  formDataToSend.append("vencimiento", payload.vencimiento || "");
  formDataToSend.append("fechaPresentacion", payload.fechaPresentacion || "");

  const nueva = await agregarDocumentacion(formDataToSend);

  await registrarMovimiento({
    usuario: usuario.id,
    accion: "alta",
    entidad: "documentacion",
    campo: "documento, descripcion, inquilino, emision, vencimiento, fechaPresentacion",
    previo: null,
    nuevo: `${payload.documento?.name}, ${payload.descripcion}`,
    detalle: `creó la documentación ${getDocumentacionLabel(nueva)} con id ${nueva.id}`
  });

  return nueva;
}

/**
 * Eliminar documentación
 */
export async function commitEliminarDocumentacion(documentacionId, documentacionObj) {
  const usuario = useUserStore.getState().user;
  await eliminarDocumentacion(documentacionId);
  await registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "documentacion",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó la documentación ${getDocumentacionLabel(documentacionObj)} con id ${documentacionId}`
  });
}