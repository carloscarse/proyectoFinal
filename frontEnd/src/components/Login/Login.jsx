import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../../Store/userStore';

const Login = ({ onClose }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser: setUserStore } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !clave) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/auth/login', {
        usuario,
        clave
      });

      const data = res.data;
      console.log('✅ Respuesta del backend:', data);

      if (data.token) {
        setUserStore({
          id: data.id,
          nombre: data.usuario,
          rol: data.rol
        });

        localStorage.setItem('token', data.token);

        navigate(data.rol === 1 ? '/admin' : '/');
        if (onClose) onClose();
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('❌ Error al conectar con el backend:', err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-dark">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Login Administrador</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => {
              setClave(e.target.value);
              setError('');
            }}
          />
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
        <div className="form-group d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-outline-light w-50 me-2">Ingresar</button>
          {onClose && (
            <button type="button" className="btn btn-secondary w-50" onClick={onClose}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;