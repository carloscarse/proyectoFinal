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
      // ✅ URL correcta con prefijo /api
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        usuario,
        clave
      });

      const data = res.data;
      console.log('✅ Respuesta del backend:', data);

      if (data.token) {
        // Guardar en Zustand con todos los campos, incluido el label
        setUserStore({
          usuario: data.usuario,
          rol: data.rol,
          nombreCompleto: data.nombreCompleto,
          label: data.label,        // 👈 ahora guardamos el label
          token: data.token
        });

        // Guardar en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', data.usuario);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('nombreCompleto', data.nombreCompleto);
        localStorage.setItem('label', data.label); // 👈 también guardamos el label

        // ✅ Condición ajustada: rol puede ser número o texto
        if (data.rol === 1 || data.rol === 'Administrador' || data.rol === 'administrador') {
          console.log('🔁 Redirigiendo a /admin');
          navigate('/admin');
        } else {
          console.log('🔁 Redirigiendo a /');
          navigate('/');
        }

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
          <button type="submit" className="btn btn-outline-light w-50 me-2">
            Ingresar
          </button>
          {onClose && (
            <button
              type="button"
              className="btn btn-secondary w-50"
              onClick={onClose}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;