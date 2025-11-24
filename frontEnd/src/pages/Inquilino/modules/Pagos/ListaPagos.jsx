import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';

function ListaPagos() {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const cargarPagos = async () => {
      try {
        const res = await api.get('/pagos');
        const data = Array.isArray(res.data) ? res.data : [];
        setPagos(data);
      } catch (err) {
        console.error('Error al obtener pagos:', err);
      }
    };
    cargarPagos();
  }, []);

  return (
    <div>
      <h2>Pagos registrados</h2>
      <ul>
        {pagos.map((p) => (
          <li key={p.id}>
            Usuario: {p.usuario} - Factura: {p.factura} - Inquilino: {p.inquilino} - {p.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPagos;