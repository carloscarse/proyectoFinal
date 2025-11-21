import { useEffect, useState } from 'react';
import useAuthStore from '../stores/authStore';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, [token]);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.usuario} - {u.rol}</li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;