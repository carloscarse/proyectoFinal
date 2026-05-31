// proyecto/frontEnd/src/pages/Admin/modules/Persona/VerObjeto.jsx

import React, { useState } from "react";
import "./Ver.css";
import VerListaDireccion from "./VerListaDireccion";
import VerListaTelefono from "./VerListaTelefono";
import VerObjetoDireccion from "../Direccion/VerObjeto";
import VerObjetoTelefono from "../Telefono/VerObjeto";

function VerObjetoPersona({ persona, onClose }) {
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [telefonoSeleccionado, setTelefonoSeleccionado] = useState(null);

  if (!persona) return null;

  return (
    <div className="persona-ver-objeto-overlay">
      <div className="persona-ver-objeto-container">
        <h3 className="persona-ver-objeto-title">Ver Persona</h3>

        {/* Contenedor interno con scroll */}
        <div className="persona-ver-objeto-body">
          <div className="persona-ver-objeto-card">
            {/* Como es temporal, no mostramos ID persistente */}
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
                direcciones={persona.direcciones || []} 
                onVer={(dir) => setDireccionSeleccionada(dir)} 
              />
            </div>

            <div className="persona-ver-relacion-section">
              <h4 className="persona-ver-relacion-title">Teléfonos</h4>
              <VerListaTelefono 
                telefonos={persona.telefonos || []} 
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

export default VerObjetoPersona;