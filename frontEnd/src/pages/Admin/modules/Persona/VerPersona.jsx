import React, { useState, useEffect } from 'react';
import { getPersonaLabel } from '../../../../utils/labels/persona';
import { formatDate } from '../../../../utils/dateFormat';
import { getDireccionLabel } from '../../../../utils/labels/direccion';
import { getTelefonoLabel } from '../../../../utils/labels/telefono';
import VerDireccion from '../Direccion/VerDireccion';
import VerTelefono from '../telefono/VerTelefono';
import { getDireccionesByPersona } from '../../../../api/direccion';
import { getTelefonosByPersona } from '../../../../api/telefono';
import './ListaPersona.css';

function VerPersona({ persona, onClose }) {
  const [direccionVer, setDireccionVer] = useState(null);
  const [telefonoVer, setTelefonoVer] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [telefonos, setTelefonos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      if (!persona?.id) return;
      try {
        const dirs = await getDireccionesByPersona(persona.id);
        setDirecciones(dirs || []);
        const tels = await getTelefonosByPersona(persona.id);
        setTelefonos(tels || []);
      } catch (error) {
        console.error('Error al cargar datos de persona:', error);
      }
    };
    cargar();
  }, [persona]);

  if (!persona) return null;

  return (
    <div className="modal-overlay">
      <div className="usuarios-form-wrapper">
        <div className="usuarios-form">
          <h3 className="text-center mb-3">Detalle de Persona</h3>

          <div className="form-scroll">
            <p><strong>ID:</strong> {persona.id}</p>
            <p><strong>Nombre completo:</strong> {getPersonaLabel(persona)}</p>
            <p><strong>Documento:</strong> {persona.documento}</p>
            <p><strong>Nacimiento:</strong> {formatDate(persona.nacimiento)}</p>
            <p><strong>Sexo:</strong> {persona.sexo}</p>
            <p><strong>Email:</strong> {persona.email}</p>

            {/* Direcciones */}
            <h4 className="mt-3">Direcciones</h4>
            <ul className="lista-direcciones">
              {direcciones.map((d) => (
                <li key={d.id || `${d.calle}-${d.numero}`} className="direccion-item">
                  <span>{getDireccionLabel(d)}</span>
                  <button
                    className="btn btn-sm btn-info btn-ver-direccion"
                    onClick={() => setDireccionVer(d)}
                  >
                    👁️
                  </button>
                </li>
              ))}
              {direcciones.length === 0 && <li>No hay direcciones registradas</li>}
            </ul>

            {/* Teléfonos */}
            <h4 className="mt-3">Teléfonos</h4>
            <ul className="lista-direcciones">
              {telefonos.map((t) => (
                <li key={t.id || `${t.pais}-${t.cArea}-${t.numero}`} className="direccion-item">
                  <span>{getTelefonoLabel(t)}</span>
                  <button
                    className="btn btn-sm btn-info btn-ver-direccion"
                    onClick={() => setTelefonoVer(t)}
                  >
                    👁️
                  </button>
                </li>
              ))}
              {telefonos.length === 0 && <li>No hay teléfonos registrados</li>}
            </ul>
          </div>

          <div className="form-buttons">
            <button type="button" className="btn btn-primary w-100" onClick={onClose}>
              Aceptar
            </button>
          </div>
        </div>
      </div>

      {/* Modales hijos */}
      {direccionVer && (
        <VerDireccion direccion={direccionVer} onClose={() => setDireccionVer(null)} />
      )}
      {telefonoVer && (
        <VerTelefono telefono={telefonoVer} onClose={() => setTelefonoVer(null)} />
      )}
    </div>
  );
}

export default VerPersona;