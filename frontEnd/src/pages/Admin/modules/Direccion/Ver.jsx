import React from "react";
import "./Ver.css";

function Ver({ direccion, onClose }) {
  if (!direccion) return null;

  return (
    <div className="modal-overlay">
      <div className="direccion-container">
        <h3 className="direccion-title">Ver Dirección</h3>
        <div className="direccion-card">
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
        <div className="form-buttons">
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Ver;