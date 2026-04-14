// proyecto/frontEnd/src/pages/Admin/modules/Persona/VerListaDireccion.jsx
import React from "react";
import "./ListaDireccion.css";

function VerListaDireccion({ direcciones = [], onVer }) {
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
        {direcciones.map((dir, idx) => (
          <tr key={idx}>
            <td className="persona-agregar-direccion-col-dato">
              {`${dir.calle} ${dir.numero} - ${dir.ciudad}`}
            </td>
            <td className="persona-agregar-direccion-acciones">
              <button 
                className="persona-agregar-direccion-btn-ver" 
                title="Ver" 
                onClick={() => onVer?.(dir)}
              >
                👁️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VerListaDireccion;