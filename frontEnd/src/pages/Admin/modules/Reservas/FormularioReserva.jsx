import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import FormularioEspacio from '../Espacios/FormularioEspacio';
import FormularioInquilino from '../Inquilinos/FormularioInquilino';
import './FormularioReserva.css';

// 🔧 Conversión de fechas SQL a formatos HTML
const toDatetimeLocal = (fechaSql) => {
  if (!fechaSql) return "";
  return fechaSql.replace(" ", "T").slice(0, 16);
};

const toDateOnly = (fechaSql) => {
  if (!fechaSql) return new Date().toISOString().slice(0, 10);
  return fechaSql.slice(0, 10);
};

function FormularioReserva({ mode = "create", reserva = {}, onClose, onSaved }) {
  const [espacios, setEspacios] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [showNuevoEspacio, setShowNuevoEspacio] = useState(false);
  const [showNuevoInquilino, setShowNuevoInquilino] = useState(false);

  const [formData, setFormData] = useState({
    fecha: toDateOnly(reserva.fecha),
    espacio: reserva.espacio || "",
    inquilino: reserva.inquilino || "",
    tipo: reserva.tipo || "",
    diaInicio: toDatetimeLocal(reserva.diaInicio),
    diaFin: toDatetimeLocal(reserva.diaFin),
    actividad: reserva.actividad || "",
    adelanto: reserva.adelanto || 0,
    estado: reserva.estado || "adeudado",
    nota: reserva.nota || ""
  });

  const fetchEspacios = async () => {
    try {
      const res = await api.get('/espacio/espacios');
      const lista = res.data || [];
      setEspacios(lista.map(e => ({
        id: String(e.id),
        label: e.nombre || `Espacio #${e.id}`
      })));
    } catch (err) {
      console.error("❌ Error al cargar espacios:", err);
    }
  };

  const fetchInquilinos = async () => {
    try {
      const res = await api.get('/inquilino/inquilinos');
      const lista = res.data || [];

      const inquilinosConLabel = await Promise.all(
        lista.map(async (i) => {
          let label = `Inquilino #${i.id}`;
          try {
            if (i.persona) {
              const resPersona = await api.get(`/persona/${i.persona}`);
              const p = resPersona.data || {};
              const partes = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido];
              label = partes.filter(v => v && v !== 'null').join(' ').trim() || label;
            }
          } catch (err) {
            console.error(`❌ Error al obtener persona ${i.persona}:`, err?.message || err);
          }
          return { id: String(i.id), label };
        })
      );

      setInquilinos(inquilinosConLabel);
    } catch (err) {
      console.error("❌ Error al cargar inquilinos:", err);
    }
  };

  useEffect(() => {
    fetchEspacios();
    fetchInquilinos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "espacio" && value === "nuevo") {
      setShowNuevoEspacio(true);
      return;
    }
    if (name === "inquilino" && value === "nuevo") {
      setShowNuevoInquilino(true);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await api.post('/reserva', formData);
      } else {
        await api.put(`/reserva/${reserva.id}`, formData);
      }
      if (onSaved) onSaved();
    } catch (err) {
      console.error("❌ Error al guardar reserva:", err);
    }
  };

  return (
    <div className="modal-card wide">
      <div className="modal-header">
        <h4>{mode === "create" ? "Nueva Reserva" : "Editar Reserva"}</h4>
        <button className="btn btn-sm btn-outline-light" onClick={onClose}>✕</button>
      </div>

      <form className="modal-body" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Fecha:
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </label>

          <label>
            Espacio:
            <select name="espacio" value={formData.espacio} onChange={handleChange} required>
              <option value="">-- Seleccione --</option>
              <option value="nuevo">➕ Nuevo Espacio</option>
              {espacios.map(e => (
                <option key={e.id} value={e.id}>{e.label}</option>
              ))}
            </select>
          </label>

          <label>
            Inquilino:
            <select name="inquilino" value={formData.inquilino} onChange={handleChange} required>
              <option value="">-- Seleccione --</option>
              <option value="nuevo">➕ Nuevo Inquilino</option>
              {inquilinos.map(i => (
                <option key={i.id} value={i.id}>{i.label}</option>
              ))}
            </select>
          </label>

          <label>
            Tipo:
            <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />
          </label>

          <label>
            Inicio:
            <input type="datetime-local" name="diaInicio" value={formData.diaInicio} onChange={handleChange} required />
          </label>

          <label>
            Fin:
            <input type="datetime-local" name="diaFin" value={formData.diaFin} onChange={handleChange} required />
          </label>

          <label>
            Actividad:
            <input type="text" name="actividad" value={formData.actividad} onChange={handleChange} required />
          </label>

          <label>
            Adelanto:
            <input type="number" step="0.01" name="adelanto" value={formData.adelanto} onChange={handleChange} />
          </label>

          <label>
            Estado:
            <select name="estado" value={formData.estado} onChange={handleChange} required>
              <option value="pagado">Pagado</option>
              <option value="adeudado">Adeudado</option>
            </select>
          </label>

          <label className="full">
            Nota:
            <textarea name="nota" value={formData.nota} onChange={handleChange} />
          </label>
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">
            {mode === "create" ? "Registrar" : "Guardar Cambios"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>

      {showNuevoEspacio && (
        <div className="modal-overlay">
          <FormularioEspacio
            onClose={async (nuevoId) => {
              setShowNuevoEspacio(false);
              if (nuevoId) {
                await fetchEspacios();
                setFormData(prev => ({ ...prev, espacio: String(nuevoId) }));
              }
            }}
          />
        </div>
      )}

      {showNuevoInquilino && (
        <div className="modal-overlay">
          <FormularioInquilino
            onClose={async (nuevoId) => {
              setShowNuevoInquilino(false);
              if (nuevoId) {
                await fetchInquilinos();
                setFormData(prev => ({ ...prev, inquilino: String(nuevoId) }));
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FormularioReserva;