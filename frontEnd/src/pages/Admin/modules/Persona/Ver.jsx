// proyecto/frontEnd/src/pages/Admin/modules/Persona/Ver.jsx

import React, { useState, useEffect } from "react";
import "./Ver.css";
import { obtenerDireccionPorPersona } from "../../../../api/direccion";
import { obtenerTelefonoPorPersona } from "../../../../api/telefono";
import { registrarMovimiento } from "../../../../api/logMovimiento"; 
import { useUserStore } from "../../../../stores/userStore"; 
import VerListaDireccion from "./VerListaDireccion";
import VerListaTelefono from "./VerListaTelefono";
import VerObjetoDireccion from "../Direccion/VerObjeto";
import VerObjetoTelefono from "../Telefono/VerObjeto";

function Ver({ persona, onClose }) {
  const [direcciones, setDirecciones] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [telefonoSeleccionado, setTelefonoSeleccionado] = useState(null);

  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarConsulta() {
      if (!persona?.id || !usuario?.id) return;

      try {
        await registrarMovimiento({
          usuario: usuario.id, // se guarda el id en la columna usuario
          accion: "consulta",
          entidad: "persona",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `consultó los datos de la persona ${getPersonaLabel(personaInicial)} con id ${persona.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar consulta:", err.message);
      }
    }

    if (persona?.id) {
      registrarConsulta();

      // Consultar direcciones
      obtenerDireccionPorPersona(persona.id)
        .then(setDirecciones)
        .catch(() => setDirecciones([]));

      // Consultar teléfonos
      obtenerTelefonoPorPersona(persona.id)
        .then(setTelefonos)
        .catch(() => setTelefonos([]));
    }
  }, [persona, usuario]);

  if (!persona) return null;

  return (
    <div className="persona-ver-objeto-overlay">
      <div className="persona-ver-objeto-container">
        <h3 className="persona-ver-objeto-title">Ver Persona</h3>

        {/* Contenedor interno con scroll */}
        <div className="persona-ver-objeto-body">
          <div className="persona-ver-objeto-card">
            <p><strong>ID:</strong> {persona.id}</p>
            <p><strong>Nombre:</strong> {persona.nombre}</p>
            <p><strong>Segundo Nombre:</strong> {persona.segundoNombre}</p>
            <p><strong>Apellido:</strong> {persona.apellido}</p>
            <p><strong>Segundo Apellido:</strong> {persona.segundoApellido}</p>
            <p><strong>Documento:</strong> {persona.documento}</p>
            <p><strong>Email:</strong> {persona.email}</p>
          </div>

          <div className="persona-ver-relaciones">
            <div className="persona-ver-relacion-section">
              <h4 className="persona-ver-relacion-title">Direcciones</h4>
              <VerListaDireccion 
                direcciones={direcciones} 
                onVer={(dir) => setDireccionSeleccionada(dir)} 
              />
            </div>

            <div className="persona-ver-relacion-section">
              <h4 className="persona-ver-relacion-title">Teléfonos</h4>
              <VerListaTelefono 
                telefonos={telefonos} 
                onVer={(tel) => setTelefonoSeleccionado(tel)} 
              />
            </div>
          </div>
        </div>

        <div className="persona-ver-objeto-form-buttons">
          <button 
            className="persona-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Cerrar
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

export default Ver;