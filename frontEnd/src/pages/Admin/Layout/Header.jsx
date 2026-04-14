// proyecto/frontEnd/src/pages/Admin/Layout/Header.jsx
import { useUserStore } from '../../../Stores/userStore';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 👇 Llamada al backend en segundo plano
    fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ usuario: user.usuario })
    }).catch(err => {
      console.error("❌ Error al registrar logout:", err);
    });

    // 👇 Cerrar sesión visualmente de inmediato
    logout(); // limpia el store
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="admin-header">
      <span>{user?.label || 'Usuario: Rol Nombre'}</span>
      <button onClick={handleLogout} className="logout-button">
        <span className="me-2">Cerrar sesión</span>
        <span role="img" aria-label="candado" className="logout-icon">🔒</span>
      </button>
    </header>
  );
}

export default Header;