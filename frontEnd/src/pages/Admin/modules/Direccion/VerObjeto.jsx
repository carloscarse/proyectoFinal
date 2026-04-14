// proyecto/frontEnd/src/pages/Admin/modules/Direccion/VerObjeto.jsx
import React from "react";
import "./Ver.css"; // estilo específico de Ver

function VerObjetoDireccion({ direccion, onClose }) {
  if (!direccion) return null;

  return (
    <div className="direccion-ver-objeto-overlay">
      <div className="direccion-ver-objeto-container">
        <h3 className="direccion-ver-objeto-title">Detalle de la Dirección</h3>
        <div className="direccion-ver-objeto-card">
          {direccion.persona && (
            <p><strong>Persona:</strong> {direccion.persona.label ?? direccion.persona}</p>
          )}
          <p><strong>Calle:</strong> {direccion.calle}</p>
          <p><strong>Número:</strong> {direccion.numero}</p>
          <p><strong>Manzana:</strong> {direccion.manzana}</p>
          <p><strong>Lote:</strong> {direccion.lote}</p>
          <p><strong>Edificio:</strong> {direccion.edificio}</p>
          <p><strong>Piso:</strong> {direccion.piso}</p>
          <p><strong>Departamento:</strong> {direccion.departamento}</p>
          <p><strong>Barrio:</strong> {direccion.barrio}</p>
          <p><strong>Localidad:</strong> {direccion.localidad}</p>
          <p><strong>Ciudad:</strong> {direccion.ciudad}</p>
          <p><strong>Provincia:</strong> {direccion.provincia}</p>
          <p><strong>País:</strong> {direccion.pais}</p>
          <p><strong>Código Postal:</strong> {direccion.codigoPostal}</p>
        </div>
        <div className="direccion-ver-objeto-form-buttons">
          <button 
            className="direccion-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerObjetoDireccion;