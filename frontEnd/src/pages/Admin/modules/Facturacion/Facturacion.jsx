import { useState } from "react";
import FormularioFactura from "./FormularioFactura";
import ListaFacturas from "./ListaFacturas";
import "./facturacion.css";

function Facturacion() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <section className="facturacion-container">
      <h1>Gestión de Facturación</h1>

      {/* Botón para abrir el modal */}
      <button className="btn btn-primary mb-3" onClick={abrirModal}>
        ➕ Nueva Factura
      </button>

      {/* Modal */}
      {mostrarModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ backgroundColor: "#2c2c2c", color: "white" }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Nueva Factura</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body">
                <FormularioFactura onClose={cerrarModal} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de facturas */}
      <ListaFacturas />
    </section>
  );
}

export default Facturacion;