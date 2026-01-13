import React from 'react';
import './ListaPersona.css';

function EliminarPersona({ persona, onCancel, onConfirm, cargando }) {
  if (!persona) return null;

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <div className="usuarios-form">
          <h3 className="text-center mb-3">Confirmar Eliminación</h3>

          <div className="form-scroll">
            <p><strong>ID:</strong> {persona.id}</p>
            <p><strong>Nombre:</strong> {persona.nombre} {persona.segundoNombre}</p>
            <p><strong>Apellido:</strong> {persona.apellido} {persona.segundoApellido}</p>
            <p><strong>Documento:</strong> {persona.documento}</p>
            <p><strong>Nacimiento:</strong> {persona.nacimiento}</p>
            <p><strong>Sexo:</strong> {persona.sexo}</p>
            <p><strong>Email:</strong> {persona.email}</p>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-secondary w-50 me-2"
              onClick={onCancel}
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger w-50"
              onClick={onConfirm}
              disabled={cargando}
            >
              {cargando ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EliminarPersona;