import React from 'react';
import { useEffect, useState } from 'react';
import { api, urlMostrarContratos } from '../../../../endpoints/endpoints'; // ← corregí la ruta si es necesario

function ListaContratos() {
  const [contratos, setContratos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
  const obtenerContratos = async () => {
    try {
      const res = await api.get(urlMostrarContratos);
      const data = Array.isArray(res.data) ? res.data : []; // validación segura
      setContratos(data);
    } catch (err) {
      console.error('Error al obtener contratos:', err);
    }
  };

  obtenerContratos();
}, []);

  return (
    <div>
      <h2>Contratos registrados</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {contratos.map((c) => (
          <li key={c.id}>
            {c.local} - {c.inquilino} ({c.fechaInicio} → {c.fechaFin}) ${c.monto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaContratos;