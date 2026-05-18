import React, { useEffect, useState } from "react";
import { actualizarTelefono, agregarTelefono, eliminarTelefono, obtenerTelefonos } from "../../../../api/telefono";
import TelefonoAgregarObjeto from "./AgregarObjeto";
import EditarObjetoTelefono from "./EditarObjeto";
import VerTelefono from "./Ver";
import EliminarTelefono from "./Eliminar";

function ListaTelefono() {
  const [telefonos, setTelefonos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [telefonoAgregando, setTelefonoAgregando] = useState(null);
  const [telefonoEditando, setTelefonoEditando] = useState(null);
  const [telefonoVer, setTelefonoVer] = useState(null);
  const [telefonoEliminar, setTelefonoEliminar] = useState(null);

  const cargarTelefonos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await obtenerTelefonos();
      setTelefonos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo cargar telefonos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTelefonos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await eliminarTelefono(id);
      await cargarTelefonos();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo eliminar telefono");
    }
  };

  const handleGuardarNuevo = async (telefono) => {
    try {
      const payload = {
        ...telefono,
        persona: telefono.persona || null,
      };
      await agregarTelefono(payload);
      await cargarTelefonos();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo agregar telefono");
    }
  };

  const handleGuardarEdicion = async (telefono) => {
    try {
      await actualizarTelefono(telefono.id, telefono);
      await cargarTelefonos();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo editar telefono");
    }
  };

  return (
    <section className="admin-module">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">Telefonos</h1>
        <button className="btn btn-primary" onClick={() => setTelefonoAgregando({})}>
          + Nuevo Teléfono
        </button>
      </div>

      {loading && <p>Cargando telefonos...</p>}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Telefono</th>
                <th>Persona</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {telefonos.length === 0 && (
                <tr>
                  <td colSpan="4">No hay telefonos registrados.</td>
                </tr>
              )}
              {telefonos.map((tel) => (
                <tr key={tel.id}>
                  <td>{tel.id}</td>
                  <td>{tel.label || `+${tel.pais || ""} ${tel.cArea || ""} ${tel.numero || ""}`.trim()}</td>
                  <td>{tel.persona}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-info" onClick={() => setTelefonoVer(tel)}>
                        Ver
                      </button>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => setTelefonoEditando(tel)}>
                        Editar
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setTelefonoEliminar(tel)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {telefonoVer && (
        <VerTelefono
          telefono={telefonoVer}
          onClose={() => setTelefonoVer(null)}
        />
      )}

      {telefonoAgregando && (
        <TelefonoAgregarObjeto
          onClose={() => setTelefonoAgregando(null)}
          onGuardar={handleGuardarNuevo}
        />
      )}

      {telefonoEditando && (
        <EditarObjetoTelefono
          telefono={telefonoEditando}
          onClose={() => setTelefonoEditando(null)}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {telefonoEliminar && (
        <EliminarTelefono
          telefono={telefonoEliminar}
          onClose={() => setTelefonoEliminar(null)}
          onEliminar={handleEliminar}
        />
      )}
    </section>
  );
}

export default ListaTelefono;
