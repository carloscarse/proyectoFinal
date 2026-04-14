// proyecto/frontEnd/src/pages/Admin/modules/Persona/AgregarListaTelefono.jsx
import React from "react";
import "./ListaTelefono.css";
import { getTelefonoLabel } from "../../../../utils/labels/telefono";

function AgregarListaTelefono({ telefonos = [], onVer, onEditar, onEliminar }) {
  return (
    <table className="persona-agregar-telefono-tabla">
      <colgroup>
        <col className="persona-agregar-telefono-col-dato" />
        <col className="persona-agregar-telefono-col-acciones" />
      </colgroup>
      <thead>
        <tr>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {telefonos.length === 0 && (
          <tr>
            <td className="persona-agregar-telefono-col-dato" colSpan="2">
              No hay teléfonos registrados.
            </td>
          </tr>
        )}
        {telefonos.filter(t => !t.eliminado).map((tel, idx) => (
          <tr key={idx}>
            <td className="persona-agregar-telefono-col-dato">
              {getTelefonoLabel(tel)}
            </td>
            <td className="persona-agregar-telefono-acciones">
              <button 
                className="persona-agregar-telefono-btn-ver" 
                title="Ver" 
                onClick={() => onVer?.(tel)}
              >
                👁️
              </button>
              <button 
                className="persona-agregar-telefono-btn-editar" 
                title="Editar" 
                onClick={() => onEditar?.(tel)}
              >
                ✏️
              </button>
              <button 
                className="persona-agregar-telefono-btn-eliminar" 
                title="Eliminar" 
                onClick={() => onEliminar?.(tel)}
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

export default AgregarListaTelefono;