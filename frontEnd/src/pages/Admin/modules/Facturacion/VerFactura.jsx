import React from "react";

function VerFactura({ factura, onClose }) {
  if (!factura) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#2c2c2c", color: "white" }}>
          <div className="modal-header">
            <h5 className="modal-title">Detalle de Factura</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {factura.id}</p>
            <p><strong>Número:</strong> {factura.numero}</p>
            <p><strong>Fecha:</strong> {factura.fecha ? new Date(factura.fecha).toLocaleString("es-AR") : "—"}</p>
            <p><strong>Estado:</strong> {factura.estado}</p>
            <p><strong>Inquilino:</strong> {factura.inquilinoNombre ?? factura.inquilino}</p>
            <p><strong>Nota:</strong> {factura.nota || "—"}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerFactura;