// proyecto/frontEnd/src/pages/Admin/modules/Persona/EliminarObjeto.jsx

import React, { useState } from "react";
import "./Eliminar.css";
import { formatDate } from "../../../../utils/dateFormat";
import VerListaDireccion from "./VerListaDireccion";
import VerListaTelefono from "./VerListaTelefono";
import VerObjetoDireccion from "../Direccion/VerObjeto";
import VerObjetoTelefono from "../Telefono/VerObjeto";

function EliminarObjetoPersona({ persona, onClose, onEliminar }) {
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const [telefonoSeleccionado, setTelefonoSeleccionado] = useState(null);

  const handleEliminar = () => {
    try {
      if (onEliminar) {
        onEliminar({ ...persona, eliminado: true });
      }
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al marcar persona como eliminada:", err.message);
      if (onClose) onClose();
    }
  };

  if (!persona) return null;

  return (
    <div className="persona-eliminar-overlay">
      <div className="persona-eliminar-container">
        <h3 className="persona-eliminar-title">Eliminar Persona</h3>
        <div className="persona-eliminar-body">
          <div className="persona-eliminar-card">
            {/* En objetos temporales no siempre hay ID persistente */}
            {persona.id && <p><strong>ID:</strong> {persona.id}</p>}
            <p><strong>Nombre:</strong> {persona.nombre}</p>
            <p><strong>Segundo Nombre:</strong> {persona.segundoNombre}</p>
            <p><strong>Apellido:</strong> {persona.apellido}</p>
            <p><strong>Segundo Apellido:</strong> {persona.segundoApellido}</p>
            <p><strong>Documento:</strong> {persona.documento}</p>
            {persona.nacimiento && (
              <p><strong>Nacimiento:</strong> {formatDate(persona.nacimiento)}</p>
            )}
            <p><strong>Sexo:</strong> {persona.sexo}</p>
            <p><strong>Email:</strong> {persona.email}</p>
          </div>

          <div className="persona-eliminar-relaciones">
            <div className="persona-eliminar-relacion-section">
              <h4 className="persona-eliminar-relacion-title">Direcciones</h4>
              <VerListaDireccion 
                direcciones={persona.direcciones || []} 
                onVer={(dir) => setDireccionSeleccionada(dir)} 
              />
            </div>

            <div className="persona-eliminar-relacion-section">
              <h4 className="persona-eliminar-relacion-title">Teléfonos</h4>
              <VerListaTelefono 
                telefonos={persona.telefonos || []} 
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

export default EliminarObjetoPersona;