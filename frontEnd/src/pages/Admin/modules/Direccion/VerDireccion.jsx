import React from 'react';
import './Direccion.css';

function VerDireccion({ direccion, onClose }) {
  if (!direccion) return null;

  return (
    <div className="modal-overlay modal-overlay-hijo"> {/* 👈 clase nueva para evitar conflicto */}
      <div className="direccion-view-wrapper"> {/* 👈 contenedor interno como en NuevaDireccion */}
        <div className="direccion-form">
          <h3 className="text-center mb-3">Detalle de Dirección</h3>

          <div className="form-scroll">
            <p><strong>ID:</strong> {direccion.id}</p>
            <p><strong>Calle:</strong> {direccion.calle || '-'}</p>
            <p><strong>Número:</strong> {direccion.numero || '-'}</p>
            <p><strong>Manzana:</strong> {direccion.manzana || '-'}</p>
            <p><strong>Lote:</strong> {direccion.lote || '-'}</p>
            <p><strong>Edificio:</strong> {direccion.edificio || '-'}</p>
            <p><strong>Piso:</strong> {direccion.piso || '-'}</p>
            <p><strong>Departamento:</strong> {direccion.departamento || '-'}</p>
            <p><strong>Barrio:</strong> {direccion.barrio || '-'}</p>
            <p><strong>Localidad:</strong> {direccion.localidad || '-'}</p>
            <p><strong>Ciudad:</strong> {direccion.ciudad || '-'}</p>
            <p><strong>Provincia:</strong> {direccion.provincia || '-'}</p>
            <p><strong>País:</strong> {direccion.pais || '-'}</p>
            <p><strong>Código Postal:</strong> {direccion.codigoPostal || '-'}</p>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerDireccion;