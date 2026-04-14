import React from "react";

function TelefonosSection({ persona, accion, setPersona, editable }) {
  const telefonos = persona.telefonos || [];

  const eliminarTelefono = (id) => {
    setPersona((prev) => ({
      ...prev,
      telefonos: prev.telefonos.map((tel) =>
        tel.id === id ? { ...tel, eliminado: true } : tel
      ),
    }));
  };

  return (
    <div className="section">
      <h4>Teléfonos</h4>
      <button
        disabled={!editable}
        onClick={() =>
          setPersona((prev) => ({
            ...prev,
            telefonos: [
              ...prev.telefonos,
              { id: Date.now(), pais: "", cArea: "", numero: "", editado: true },
            ],
          }))
        }
      >
        Nuevo Teléfono
      </button>

      <ul>
        {telefonos.map((tel) => (
          <li key={tel.id}>
            {tel.pais} {tel.cArea} {tel.numero}
            {editable && (
              <>
                <button
                  onClick={() =>
                    setPersona((prev) => ({
                      ...prev,
                      telefonos: prev.telefonos.map((t) =>
                        t.id === tel.id ? { ...t, editado: true } : t
                      ),
                    }))
                  }
                >
                  Editar
                </button>
                <button onClick={() => eliminarTelefono(tel.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TelefonosSection;