import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioPago from './FormularioPago';
import './ListaPagos.css';

function ListaPagos() {
  const [pagos, setPagos] = useState([]);
  const [inquilinoLabels, setInquilinoLabels] = useState({});
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [modoVer, setModoVer] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handler = () => setRefreshKey((k) => k + 1);
    window.addEventListener('pagos:refresh', handler);
    return () => window.removeEventListener('pagos:refresh', handler);
  }, []);

  const fetchInquilinoLabels = async () => {
    try {
      const res = await api.get('/inquilino/inquilinos');
      const lista = Array.isArray(res.data) ? res.data : [];

      const entradas = await Promise.all(
        lista.map(async (i) => {
          let label = `Inquilino #${i.id}`;
          try {
            if (i.persona) {
              const resPersona = await api.get(`/persona/${i.persona}`);
              const p = resPersona.data || {};
              const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
              label = partes
                .filter((v) => v && v !== 'null' && v.trim() !== '')
                .join(' ')
                .trim() || label;
            }
          } catch (err) {
            console.error(`❌ Error al obtener persona ${i.persona}:`, err?.message || err);
          }
          return [String(i.id), label];
        })
      );

      const map = Object.fromEntries(entradas);
      setInquilinoLabels(map);
    } catch (err) {
      console.error('❌ Error al obtener inquilinos:', err?.message || err);
      setInquilinoLabels({});
    }
  };

  const fetchPagos = async () => {
    try {
      const res = await api.get(`/pago/pagos?ts=${Date.now()}`);
      const lista = Array.isArray(res.data) ? res.data : [];

      const pagosConLabel = lista.map((p) => {
        const inqId = typeof p.inquilino === 'object' && p.inquilino !== null
          ? p.inquilino.id
          : p.inquilino;

        const idStr = inqId != null ? String(inqId) : '';
        const label = idStr ? (inquilinoLabels[idStr] || `Inquilino #${idStr}`) : '';

        return {
          ...p,
          inquilinoLabel: label,
        };
      });

      setPagos(pagosConLabel);
    } catch (err) {
      console.error('❌ Error al obtener pagos:', err);
      setPagos([]);
    }
  };

  useEffect(() => {
    const run = async () => {
      await fetchInquilinoLabels();
      await fetchPagos();
    };
    run();
  }, [refreshKey]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este pago?')) return;
    try {
      await api.delete(`/pago/pago/${id}`);
      setPagos((prev) => prev.filter((p) => p.id !== id));
      setRefreshKey((k) => k + 1);
      window.dispatchEvent(new CustomEvent('pagos:refresh'));
    } catch (err) {
      console.error('❌ Error al eliminar pago:', err);
      alert('Error al eliminar el pago');
    }
  };

  return (
    <div className="pagos-lista">
      <h3 className="text-center mb-3">Gestión de Pagos</h3>

      <table className="tabla-pagos">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Factura</th>
            <th>Inquilino</th>
            <th>Nota</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((p) => (
            <tr key={p.id}>
              <td>{p.fecha}</td>
              <td>{p.usuario?.usuario}</td>
              <td>#{p.factura?.numero}</td>
              <td>{p.inquilinoLabel}</td>
              <td>{p.nota}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => {
                    setPagoSeleccionado(p);
                    setModoVer(true);
                  }}
                >
                  👁 Ver
                </button>
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => {
                    setPagoSeleccionado(p);
                    setModoEdicion(true);
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminar(p.id)}
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
          {pagos.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No hay pagos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Ver Pago */}
      {modoVer && pagoSeleccionado && (
        <div className="modal-overlay">
          <div className="usuarios-form">
            <h4 className="text-center mb-3">Datos del Pago</h4>
            <div className="form-scroll">
              <p><strong>ID:</strong> {pagoSeleccionado.id}</p>
              <p><strong>Fecha:</strong> {pagoSeleccionado.fecha}</p>
              <p><strong>Usuario:</strong> {pagoSeleccionado.usuario?.usuario}</p>
              <p><strong>Factura:</strong> #{pagoSeleccionado.factura?.numero}</p>
              <p><strong>Inquilino:</strong> {pagoSeleccionado.inquilinoLabel}</p>
              <p><strong>Nota:</strong> {pagoSeleccionado.nota}</p>
            </div>
            <div className="form-buttons">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setModoVer(false);
                  setPagoSeleccionado(null);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Pago */}
      {modoEdicion && pagoSeleccionado && (
        <div className="modal-overlay">
          <FormularioPago
            mode="edit"
            initialPago={pagoSeleccionado}
            onClose={() => {
              setModoEdicion(false);
              setPagoSeleccionado(null);
              setRefreshKey((k) => k + 1);
              window.dispatchEvent(new CustomEvent('pagos:refresh'));
            }}
            onSaved={async () => {
              await fetchInquilinoLabels();
              await fetchPagos();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ListaPagos;