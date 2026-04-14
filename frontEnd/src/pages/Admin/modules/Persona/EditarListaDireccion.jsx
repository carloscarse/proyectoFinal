// proyecto/frontEnd/src/pages/Admin/modules/Persona/EditarListaDireccion.jsx
import React from "react";
import "./ListaDireccion.css";
import { getDireccionLabel } from "../../../../utils/labels/direccion";

function EditarListaDireccion({ direcciones = [], onVer, onEditar, onEliminar }) {
  return (
    <table className="persona-agregar-direccion-tabla">
      <colgroup>
        <col className="persona-agregar-direccion-col-dato" />
        <col className="persona-agregar-direccion-col-acciones" />
      </colgroup>
      <thead>
        <tr>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {direcciones.length === 0 && (
          <tr>
            <td className="persona-agregar-direccion-col-dato" colSpan="2">
              No hay direcciones registradas.
            </td>
          </tr>
        )}
        {direcciones.filter(d => !d.eliminado).map((dir, idx) => (
          <tr key={idx}>
            <td className="persona-agregar-direccion-col-dato">
              {getDireccionLabel(dir)}
            </td>
            <td className="persona-agregar-direccion-acciones">
              <button 
                className="persona-agregar-direccion-btn-ver" 
                title="Ver" 
                onClick={() => onVer?.(dir)}
              >
                👁️
              </button>
              <button 
                className="persona-agregar-direccion-btn-editar" 
                title="Editar" 
                onClick={() => onEditar?.(dir)}
              >
                ✏️
              </button>
              <button 
                className="persona-agregar-direccion-btn-eliminar" 
                title="Eliminar" 
                onClick={() => onEliminar?.(dir)}
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EditarListaDireccion;