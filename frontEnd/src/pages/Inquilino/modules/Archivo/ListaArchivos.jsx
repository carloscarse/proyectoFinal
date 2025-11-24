import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function ListaArchivos() {
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    const cargarArchivos = async () => {
      try {
        const res = await api.get('/archivos');
        const data = Array.isArray(res.data) ? res.data : [];
        setArchivos(data);
      } catch (err) {
        console.error('Error al obtener archivos:', err);
      }
    };
    cargarArchivos();
  }, []);

  return (
    <div>
      <h2>Archivos vinculados</h2>
      <ul>
        {archivos.map((a) => (
          <li key={a.id}>
            {a.archivo} → Doc: {a.documentacion} → <a href={a.url} target="_blank" rel="noopener noreferrer">Ver archivo</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaArchivos;