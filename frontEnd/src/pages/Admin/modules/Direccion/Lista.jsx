import React, { useEffect, useState } from "react";
import { actualizarDireccion, agregarDireccion, eliminarDireccion, obtenerDirecciones } from "../../../../api/direccion";
import DireccionAgregarObjeto from "./AgregarObjeto";
import EditarObjetoDireccion from "./EditarObjeto";
import VerDireccion from "./Ver";
import EliminarDireccion from "./Eliminar";

function ListaDireccion() {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [direccionAgregando, setDireccionAgregando] = useState(null);
  const [direccionEditando, setDireccionEditando] = useState(null);
  const [direccionVer, setDireccionVer] = useState(null);
  const [direccionEliminar, setDireccionEliminar] = useState(null);

  const cargarDirecciones = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await obtenerDirecciones();
      setDirecciones(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo cargar direcciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDirecciones();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await eliminarDireccion(id);
      await cargarDirecciones();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo eliminar direccion");
    }
  };

  const handleGuardarNueva = async (direccion) => {
    try {
      const payload = {
        ...direccion,
        persona: direccion.persona || null,
      };
      await agregarDireccion(payload);
      await cargarDirecciones();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo agregar direccion");
    }
  };

  const handleGuardarEdicion = async (direccion) => {
    try {
      await actualizarDireccion(direccion.id, direccion);
      await cargarDirecciones();
    } catch (err) {
      setError(err.response?.data?.error || "No se pudo editar direccion");
    }
  };

  return (
    <section className="admin-module">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">Direcciones</h1>
        <button className="btn btn-primary" onClick={() => setDireccionAgregando({})}>
          + Nueva Dirección
        </button>
      </div>

      {loading && <p>Cargando direcciones...</p>}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Direccion</th>
                <th>Persona</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {direcciones.length === 0 && (
                <tr>
                  <td colSpan="4">No hay direcciones registradas.</td>
                </tr>
              )}
              {direcciones.map((dir) => (
                <tr key={dir.id}>
                  <td>{dir.id}</td>
                  <td>{dir.label || `${dir.calle || ""} ${dir.numero || ""}`.trim()}</td>
                  <td>{dir.persona}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-info" onClick={() => setDireccionVer(dir)}>
                        Ver
                      </button>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => setDireccionEditando(dir)}>
                        Editar
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setDireccionEliminar(dir)}>
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

      {direccionVer && (
        <VerDireccion
          direccion={direccionVer}
          onClose={() => setDireccionVer(null)}
        />
      )}

      {direccionAgregando && (
        <DireccionAgregarObjeto
          onClose={() => setDireccionAgregando(null)}
          onGuardar={handleGuardarNueva}
        />
      )}

      {direccionEditando && (
        <EditarObjetoDireccion
          direccion={direccionEditando}
          onClose={() => setDireccionEditando(null)}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {direccionEliminar && (
        <EliminarDireccion
          direccion={direccionEliminar}
          onClose={() => setDireccionEliminar(null)}
          onEliminar={handleEliminar}
        />
      )}
    </section>
  );
}

export default ListaDireccion;
