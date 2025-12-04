import { useState, useEffect } from "react";
import { api } from "../../../../endpoints/endpoints";
import FormularioInquilino from "../Inquilinos/FormularioInquilino";

function FormularioFactura({ onClose, onCreacion }) {
  const [numero, setNumero] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("emitida");
  const [inquilino, setInquilino] = useState("");
  const [nota, setNota] = useState("");
  const [inquilinos, setInquilinos] = useState([]);
  const [mostrarModalInquilino, setMostrarModalInquilino] = useState(false);

  const cargarInquilinos = async () => {
    try {
      const res = await api.get("/inquilino");
      const data = Array.isArray(res.data) ? res.data : [];
      setInquilinos(data);
    } catch (err) {
      console.error("❌ Error al obtener inquilinos:", err);
    }
  };

  useEffect(() => {
    cargarInquilinos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      numero,
      fecha,
      estado,
      inquilino,
      nota,
    };

    try {
      const res = await api.post("/factura", datos);
      if (onCreacion) onCreacion(res.data);
      window.dispatchEvent(new CustomEvent("facturas:refresh"));
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al registrar factura:", err);
    }
  };

  const handleNuevoInquilino = () => {
    setMostrarModalInquilino(true);
  };

  const handleCerrarModalInquilino = (nuevo) => {
    setMostrarModalInquilino(false);
    if (nuevo) {
      cargarInquilinos();
      setInquilino(nuevo.id);
    }
  };

  return (
    <>
      <form className="facturacion-form" onSubmit={handleSubmit}>
        <label>
          Número:
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </label>

        <label>
          Fecha:
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>

        <label>
          Estado:
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="emitida">Emitida</option>
            <option value="pagada">Pagada</option>
            <option value="anulada">Anulada</option>
          </select>
        </label>

        <label>
          Inquilino:
          <select
            value={inquilino}
            onChange={(e) => {
              if (e.target.value === "nuevo") {
                handleNuevoInquilino();
              } else {
                setInquilino(e.target.value);
              }
            }}
            required
          >
            <option value="nuevo">➕ Nuevo</option>
            {inquilinos.map((inq) => {
              const p = inq.persona;
              const label = [p.nombre, p.segundoNombre, p.apellido, p.segundoApellido]
                .filter((v) => v && v !== "null")
                .join(" ");
              return (
                <option key={inq.id} value={inq.id}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Nota:
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          ></textarea>
        </label>

        <button type="submit">GUARDAR</button>
      </form>

      {mostrarModalInquilino && (
        <FormularioInquilino onClose={handleCerrarModalInquilino} />
      )}
    </>
  );
}

export default FormularioFactura;