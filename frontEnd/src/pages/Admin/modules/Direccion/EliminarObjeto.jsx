// proyecto/frontEnd/src/pages/Admin/modules/Direccion/EliminarObjeto.jsx
import React from "react";
import "./Eliminar.css";

function EliminarObjetoDireccion({ direccion, onEliminar, onClose }) {
  if (!direccion) return null;

  return (
    <div className="modal-overlay">
      <div className="eliminar-container">
        <h3 className="eliminar-title">Eliminar Dirección</h3>
        <div className="eliminar-body">
          <p><strong>ID:</strong> {direccion.id}</p>
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
        <div className="eliminar-buttons">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button 
            className="btn-eliminar" 
            onClick={() => {
              try {
                onEliminar({ ...direccion, eliminado: true });
              } catch (err) {
                console.error("❌ Error al marcar dirección como eliminada:", err);
              } finally {
                onClose();
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EliminarObjetoDireccion;