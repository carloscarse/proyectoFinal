// proyecto/frontEnd/src/components/Login/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../../stores/userStore';

const Login = ({ onClose }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser: setUserStore } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!usuario || !clave) {
      setError('Completá todos los campos');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        usuario,
        clave
      });

      const data = res.data;
      console.log('✅ Respuesta del backend:', data);

      if (data.token) {
        const userObj = {
          id: data.id,
          usuario: data.usuario,
          rol: data.rol,
          rolNombre: data.rolNombre,
          nombreCompleto: data.nombreCompleto,
          label: data.label,
          token: data.token,
          permisos: data.permisos || []
        };

        // Guardar en Zustand
        setUserStore(userObj);

        // Guardar en localStorage (usado por axiosConfig para el Bearer token)
        localStorage.setItem('usuario', JSON.stringify(userObj));

        // ✅ Redirigir siempre al dashboard
        console.log('🔁 Redirigiendo a /admin');
        navigate('/admin');

        // Cerrar modal después de la redirección (con delay)
        if (onClose) {
          setTimeout(() => onClose(), 300);
        }
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('❌ Error al conectar con el backend:', err);
      const backendError = err?.response?.data?.error;
      setError(backendError || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
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
          <button
            type="submit"
            className="btn btn-outline-light w-50 me-2"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
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