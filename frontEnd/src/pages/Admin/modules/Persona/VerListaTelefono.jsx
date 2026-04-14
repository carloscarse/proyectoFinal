// proyecto/frontEnd/src/pages/Admin/modules/Persona/VerListaTelefono.jsx
import React from "react";
import "./ListaTelefono.css";

function VerListaTelefono({ telefonos = [], onVer }) {
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
        {telefonos.map((tel, idx) => (
          <tr key={idx}>
            <td className="persona-agregar-telefono-col-dato">
              {`+${tel.pais} (${tel.cArea}) ${tel.numero}`}
            </td>
            <td className="persona-agregar-telefono-acciones">
              <button 
                className="persona-agregar-telefono-btn-ver" 
                title="Ver" 
                onClick={() => onVer?.(tel)}
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

export default VerListaTelefono;