// proyecto/frontEnd/src/pages/Admin/Layout/SideBar/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../stores/userStore";
import "./SideBar.css";

import direccion from "./items/direccion";
import persona from "./items/persona";
import telefono from "./items/telefono";
import rubro from "./items/rubro";
import inquilino from "./items/inquilino";
import espacio from "./items/espacio"

import { registrarMovimiento } from "../../../../api/logMovimiento";

const menuItems = [direccion, espacio, persona, rubro, telefono, inquilino];

function Sidebar() {
  const { user } = useUserStore();
  const permisos = user?.permisos || [];
  const navigate = useNavigate();

  // 👇 Función genérica para registrar consulta de cualquier entidad
  const registrarConsulta = async (entidad) => {
    if (!user) return;
    try {
      await registrarMovimiento({
        accion: "consulta",
        entidad,
        campo: "id",
        previo: null,
        nuevo: null,
        detalle: `listó los registros de ${entidad}`
      });
    } catch (err) {
      console.error(`❌ Error registrando log de ${entidad}:`, err.message);
    }
  };

  const handleNavClick = async (item) => {
    await registrarConsulta(item.path);
    navigate(`/admin/${item.path}`);
  };

  return (
    <aside className="admin-sidebar">
      <h3>Secciones</h3>
      <nav>
        {menuItems
          .filter(item => item.visible && permisos.includes(item.permiso))
          .map(item => (
            <button
              key={item.path}
              className="sidebar-btn"
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </button>
          ))}
      </nav>
    </aside>
  );
}

export default Sidebar;