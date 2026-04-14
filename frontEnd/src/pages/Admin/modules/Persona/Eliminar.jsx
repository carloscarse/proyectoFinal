// proyecto/frontEnd/src/pages/Admin/modules/Persona/Eliminar.jsx

import React, { useState, useEffect } from "react";
import "./Eliminar.css";
import { formatDate } from "../../../../utils/dateFormat";
import { eliminarPersona } from "../../../../api/persona";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { useUserStore } from "../../../../stores/userStore";
import { obtenerDireccionPorPersona } from "../../../../api/direccion";
import { obtenerTelefonoPorPersona } from "../../../../api/telefono";
import VerListaDireccion from "./VerListaDireccion";
import VerListaTelefono from "./VerListaTelefono";
import VerObjetoDireccion from "../Direccion/VerObjeto";
import VerObjetoTelefono from "../Telefono/VerObjeto";

function Eliminar({ persona, onClose, onEliminar }) {
  const usuario = useUserStore((state) => state.user);

  const [direcciones, setDirecciones] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [telefonoSeleccionado, setTelefonoSeleccionado] = useState(null);

  // Al abrir el modal, registrar inicio del proceso y cargar relaciones
  useEffect(() => {
    async function registrarInicio() {
      if (!persona?.id || !usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-eliminacion",
          entidad: "persona",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de eliminación de la persona ${getPersonaLabel(personaInicial)} con id ${persona.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de eliminación:", err.message);
      }
    }

    if (persona?.id) {
      registrarInicio();

      // cargar direcciones
      obtenerDireccionPorPersona(persona.id)
        .then(setDirecciones)
        .catch(() => setDirecciones([]));

      // cargar teléfonos
      obtenerTelefonoPorPersona(persona.id)
        .then(setTelefonos)
        .catch(() => setTelefonos([]));
    }
  }, [persona, usuario]);

  const handleEliminar = async () => {
    if (!persona?.id) return;
    try {
      await eliminarPersona(persona.id);

      await registrarMovimiento({
        usuario: usuario?.id || "sistema",
        accion: "baja",
        entidad: "persona",
        campo: "Todos",
        previo: null,
        nuevo: null,
        detalle: `eliminó la persona ${persona.nombre} con id ${persona.id}`
      });

      if (onEliminar) onEliminar(); // refresca lista
      if (onClose) onClose();       // cierra modal
    } catch (err) {
      console.error("❌ Error al eliminar persona:", err.message);
    }
  };

  if (!persona) return null;

  return (
    <div className="persona-eliminar-overlay">
      <div className="persona-eliminar-container">
        <h3 className="persona-eliminar-title">Eliminar Persona</h3>
        <div className="persona-eliminar-body">
          <div className="persona-eliminar-card">
            <p><strong>ID:</strong> {persona.id}</p>
            <p><strong>Nombre:</strong> {persona.nombre}</p>
            <p><strong>Segundo Nombre:</strong> {persona.segundoNombre}</p>
            <p><strong>Apellido:</strong> {persona.apellido}</p>
            <p><strong>Segundo Apellido:</strong> {persona.segundoApellido}</p>
            <p><strong>Documento:</strong> {persona.documento}</p>
            <p><strong>Nacimiento:</strong> {formatDate(persona.nacimiento)}</p>
            <p><strong>Sexo:</strong> {persona.sexo}</p>
            <p><strong>Email:</strong> {persona.email}</p>
          </div>

          <div className="persona-eliminar-relaciones">
            <div className="persona-eliminar-relacion-section">
              <h4 className="persona-eliminar-relacion-title">Direcciones</h4>
              <VerListaDireccion 
                direcciones={direcciones} 
                onVer={(dir) => setDireccionSeleccionada(dir)} 
              />
            </div>

            <div className="persona-eliminar-relacion-section">
              <h4 className="persona-eliminar-relacion-title">Teléfonos</h4>
              <VerListaTelefono 
                telefonos={telefonos} 
                onVer={(tel) => setTelefonoSeleccionado(tel)} 
              />
            </div>
          </div>
        </div>

        <div className="persona-eliminar-buttons">
          <button 
            className="persona-eliminar-btn-cancelar" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="persona-eliminar-btn-eliminar" 
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Modales de ver relaciones */}
      {direccionSeleccionada && (
        <VerObjetoDireccion
          direccion={direccionSeleccionada}
          onClose={() => setDireccionSeleccionada(null)}
        />
      )}
      {telefonoSeleccionado && (
        <VerObjetoTelefono
          telefono={telefonoSeleccionado}
          onClose={() => setTelefonoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default Eliminar;